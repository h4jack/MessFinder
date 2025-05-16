import React, { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, push, onChildAdded, query, orderByChild } from 'firebase/database';

const ChatPage = ({ chatId, currentUserId, ownerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const db = getDatabase();

  useEffect(() => {
    // Listen to messages in the chat
    const messagesRef = ref(db, `/chats/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'));
    const handleNewMessage = (snapshot) => {
      if (snapshot.exists()) {
        setMessages((prev) => [...prev, snapshot.val()]);
      }
    };
    onChildAdded(messagesQuery, handleNewMessage);

    return () => {
      // cleanup: detach listener
      // Firebase onChildAdded returns the unsubscribe function
    };
  }, [chatId, db]);

  useEffect(() => {
    // Scroll to bottom when messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const messagesRef = ref(db, `/messages/chats/${chatId}/messages`);
    push(messagesRef, {
      senderId: currentUserId,
      text: newMessage.trim(),
      timestamp: Date.now(),
      read: false,
    });
    setNewMessage('');
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      fontFamily: 'Arial, sans-serif',
    }}>
      <header style={{
        padding: '10px',
        borderBottom: '1px solid #ccc',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        backgroundColor: '#007bff',
        color: '#fff',
      }}>
        Chat with {ownerId === currentUserId ? 'You' : 'Owner'}
      </header>

      <div style={{
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
      }}>
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>No messages yet.</p>
        )}
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.senderId === currentUserId;
          return (
            <div key={idx} style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                backgroundColor: isCurrentUser ? '#007bff' : '#e0e0e0',
                color: isCurrentUser ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: '15px',
                maxWidth: '70%',
                wordWrap: 'break-word',
                fontSize: '0.9rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                {msg.text}
                <div style={{ fontSize: '0.7rem', marginTop: '4px', opacity: 0.7, textAlign: 'right' }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        padding: '10px',
        borderTop: '1px solid #ccc',
        display: 'flex',
        gap: '10px',
      }}>
        <input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '1rem',
            borderRadius: '20px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 16px',
            fontSize: '1rem',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;