import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaTrash, FaCopy, FaArrowLeft, FaEllipsisH } from 'react-icons/fa';

import { chatRTB, userRTB } from '../../context/firebase-rtb';
import { useFirebase } from '../../context/firebase';

const ChatApp = () => {
    // 🔹 Firebase setup
    const firebase = useFirebase();
    const chat = chatRTB(firebase);
    const user = userRTB(firebase);

    const location = useLocation();
    const navigate = useNavigate();

    // 🔹 Refs
    const chatWindowRef = useRef(null);

    // 🔹 State variables
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [showHeaderOptions, setShowHeaderOptions] = useState(false);
    const [popupMenu, setPopupMenu] = useState({ visible: false, x: 0, y: 0, chatId: null, messageIndex: null });
    const [hasAutoSelectedChat, setHasAutoSelectedChat] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const selectedChat = chats.find(c => c.id === selectedChatId);

    // 🔹 Auth listener
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            setCurrentUserId(user ? user.uid : null);
        });
        return () => unsubscribe();
    }, []);

    // 🔹 Fetch and listen to chats
    useEffect(() => {
        const fetchChats = async () => {
            if (!currentUserId) return;
            try {
                const userChats = await chat.getUserChats(currentUserId);
                const chatEntries = Object.entries(userChats || {});

                const fullChats = await Promise.all(
                    chatEntries.map(async ([chatId, data]) => {
                        let chatData = await chat.getChat(chatId);
                        if (!chatData) {
                            await chat.createChat(data.ownerId, data.userId, chatId);
                            chatData = await chat.getChat(chatId);
                        }

                        const otherUserId = chatData.ownerId === currentUserId ? chatData.userId : chatData.ownerId;
                        const otherUser = await user.getData(otherUserId);

                        return {
                            id: chatId,
                            name: otherUser?.displayName || "Unknown User",
                            username: otherUser?.username || "",
                            photoURL: otherUser?.photoURL || "/assets/avatar-default.svg",
                            messages: [],
                            chatId,
                            ownerId: chatData.ownerId,
                            userId: chatData.userId,
                        };
                    })
                );

                setChats(fullChats);

                fullChats.forEach((chatObj) => {
                    chat.onChatMessages(chatObj.id, (messages) => {
                        setChats((prevChats) =>
                            prevChats.map((c) =>
                                c.id === chatObj.id ? { ...c, messages } : c
                            )
                        );
                    });
                });
            } catch (err) {
                console.error("Failed to fetch chats:", err);
            }
        };

        fetchChats();
    }, [currentUserId]);

    // 🔹 Auto-select chat from location state
    useEffect(() => {
        if (!hasAutoSelectedChat && chats.length > 0 && location.state?.chatId) {
            const match = chats.find(c => c.id === location.state.chatId);
            if (match) {
                setSelectedChatId(match.id);
                setHasAutoSelectedChat(true);
            }
        }
    }, [chats, location.state?.chatId, hasAutoSelectedChat]);

    // 🔹 Auto-scroll on new messages
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [selectedChat?.messages]);

    // 🔹 Close popup menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (popupMenu.visible) {
                setPopupMenu({ visible: false, x: 0, y: 0, chatId: null, messageIndex: null });
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [popupMenu.visible]);

    // 🔹 Chat selection
    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        setShowHeaderOptions(false);
    };

    const handleBack = () => {
        setSelectedChatId(null);
        setShowHeaderOptions(false);
        setPopupMenu({ visible: false, x: 0, y: 0, chatId: null, messageIndex: null });
    };

    // 🔹 Message send
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChat) return;

        const isOwner = selectedChat.ownerId === currentUserId;
        const sentFlag = !isOwner;

        try {
            await chat.sendMessage(selectedChat.id, newMessage.trim(), sentFlag);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSendMessage();
    };

    // 🔹 Header Options
    const toggleHeaderOptions = () => {
        setShowHeaderOptions(prev => !prev);
    };

    const handleDeleteChat = async () => {
        if (!selectedChat) return;
        try {
            await chat.deleteChat(selectedChat.id);
            setChats(prev => prev.filter(c => c.id !== selectedChat.id));
            handleBack();
        } catch (error) {
            console.error('Failed to delete chat:', error);
        }
    };

    const handleReportChat = () => {
        if (!selectedChat || !currentUserId) return;

        const otherUserId = selectedChat.ownerId === currentUserId
            ? selectedChat.userId
            : selectedChat.ownerId;

        navigate(`/info/report/`, {
            state: { userId: otherUserId, username: selectedChat.username }
        });

        setShowHeaderOptions(false);
    };

    // 🔹 Message menu (copy/delete)
    const handleMessageClick = (e, chatId, messageIndex) => {
        e.preventDefault();

        const chatObj = chats.find(c => c.chatId === chatId);
        const message = chatObj?.messages[messageIndex];

        const isOwner = chatObj?.ownerId === currentUserId;
        const isSentByCurrentUser = isOwner ? !message?.sent : message?.sent;

        if (!isSentByCurrentUser) return;

        const rect = e.currentTarget.getBoundingClientRect();
        setPopupMenu({
            visible: true,
            x: rect.right + window.scrollX,
            y: rect.top + window.scrollY,
            chatId,
            messageIndex
        });
    };

    const handleDeleteMessage = async () => {
        const { chatId, messageIndex } = popupMenu;
        if (!popupMenu.visible) return;

        try {
            await chat.deleteMessage(chatId, messageIndex);
        } catch (error) {
            console.error("Failed to delete message:", error);
        }

        setPopupMenu({ visible: false, x: 0, y: 0, chatId: null, messageIndex: null });
    };

    const handleCopyMessage = () => {
        const { chatId, messageIndex } = popupMenu;
        if (!popupMenu.visible) return;

        const chatObj = chats.find(c => c.id === chatId);
        const message = chatObj?.messages[messageIndex];

        if (message) navigator.clipboard.writeText(message.text);

        setPopupMenu({ visible: false, x: 0, y: 0, chatId: null, messageIndex: null });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] w-full mx-auto rounded-lg shadow-md bg-white select-none custom-scrollbar">
            {!selectedChat && (
                <ChatList chats={chats} onSelectChat={handleSelectChat} />
            )}

            {selectedChat && (
                <>
                    {/* Header */}
                    <div className="flex items-center shadow-sm px-4 py-3 relative">
                        <button
                            onClick={handleBack}
                            aria-label="Back to chat list"
                            className="p-2 mr-3 text-gray-600 hover:bg-gray-200 rounded-full transition"
                        >
                            <FaArrowLeft size={20} />
                        </button>

                        <Link to={`/profile/${selectedChat.username}`}>
                            <img
                                src={selectedChat.photoURL}
                                alt={`${selectedChat.name} profile`}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                                loading="lazy"
                            />
                        </Link>

                        <div className="flex-1 font-semibold truncate">
                            {selectedChat.name}
                        </div>

                        <div className="relative">
                            <button
                                aria-haspopup="true"
                                aria-expanded={showHeaderOptions}
                                onClick={toggleHeaderOptions}
                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition"
                            >
                                <FaEllipsisV size={18} />
                            </button>

                            {showHeaderOptions && (
                                <div className="absolute right-0 top-10 w-36 bg-white border rounded shadow-md z-20" role="menu">
                                    <button
                                        onClick={handleReportChat}
                                        className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        <FaEllipsisH className="mr-2" /> Report
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                        ref={chatWindowRef}
                        className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 custom-scrollbar"
                        aria-label="Messages"
                    >
                        {selectedChat.messages.length === 0 ? (
                            <div className="text-center text-gray-400 mt-16 select-text">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            selectedChat.messages.map((message, index) => (
                                <Message
                                    key={index}
                                    chatId={selectedChat.id}
                                    message={message}
                                    index={index}
                                    onMessageClick={handleMessageClick}
                                    isOwner={selectedChat.ownerId === currentUserId}
                                />
                            ))
                        )}
                    </div>

                    {/* Message Input */}
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex items-center shadow-[0_3px_5px] p-3"
                        role="form"
                        aria-label="Send message form"
                    >
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            aria-label="Type your message"
                            className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            maxLength={500}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="ml-3 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 rounded-full p-2 transition disabled:opacity-50"
                            aria-label="Send message"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 0 5z" />
                            </svg>
                        </button>
                    </form>

                    {/* Popup Menu */}
                    {popupMenu.visible && (
                        <ul
                            className="absolute bg-white border rounded shadow-md z-30 text-gray-700 text-sm"
                            style={{ top: popupMenu.y + 4, left: popupMenu.x - 140, minWidth: '140px' }}
                            role="menu"
                        >
                            <li>
                                <button
                                    onClick={handleDeleteMessage}
                                    className="flex items-center w-full px-3 py-2 hover:bg-red-100 text-red-600"
                                    role="menuitem"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleCopyMessage}
                                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    <FaCopy className="mr-2" /> Copy
                                </button>
                            </li>
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

const ChatList = ({ chats, onSelectChat }) => (
    <div className="relative flex flex-col overflow-auto p-4 bg-white rounded-t-lg shadow-inner custom-scrollbar">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 sticky top-0">Chats</h2>
        {chats.length === 0 ? (
            <p className="text-gray-500 select-text">No chats available.</p>
        ) : (
            <ul className="divide-y divide-gray-200 overflow-auto custom-scrollbar">
                {chats.map(chat => (
                    <li
                        key={chat.id}
                        tabIndex={0}
                        role="button"
                        className="flex items-center cursor-pointer py-3 px-2 rounded hover:bg-gray-100 focus-visible:ring focus-visible:ring-blue-500 focus:outline-none"
                        onClick={() => onSelectChat(chat.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelectChat(chat.id);
                            }
                        }}
                    >
                        <img
                            src={chat.photoURL}
                            alt={`${chat.name} profile`}
                            className="w-12 h-12 rounded-full object-cover mr-4 flex-shrink-0"
                            loading="lazy"
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-lg font-medium text-gray-900 truncate select-text">
                                {chat.name}
                            </span>
                            <span className="text-sm text-gray-500 truncate select-text">
                                {chat.messages.length > 0
                                    ? chat.messages[chat.messages.length - 1].text
                                    : <span className="text-gray-400 italic">No messages yet</span>}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);


const Message = ({ chatId, message, index, onMessageClick, isOwner }) => {
    const actualSent = isOwner ? !message.sent : message.sent;

    const alignment = actualSent ? 'justify-end' : 'justify-start';
    const bgColor = actualSent ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-900';
    const borderRadius = actualSent
        ? 'rounded-tl-lg rounded-bl-lg rounded-br-lg'
        : 'rounded-tr-lg rounded-br-lg rounded-bl-lg';

    return (
        <div
            className={`flex ${alignment}`}
            onContextMenu={(e) => onMessageClick(e, chatId, index)}
            onClick={(e) => onMessageClick(e, chatId, index)}
            role="button"
            tabIndex={0}
            aria-label={`${actualSent ? 'Sent' : 'Received'} message: ${message.text}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onMessageClick(e, chatId, index);
                }
            }}
        >
            <div
                className={`${bgColor} px-4 py-2 max-w-xs md:max-w-md whitespace-pre-wrap break-words ${borderRadius} cursor-pointer select-text`}
            >
                {message.text}
            </div>
        </div>
    );
};


export default ChatApp;

