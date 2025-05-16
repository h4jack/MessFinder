import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { bookmarksRTB, roomsRTB } from "../../context/firebase-rtb";
import { Loader } from "../ui/loader";

const Bookmarks = () => {
    const firebase = useFirebase();
    const { getBookmarks } = bookmarksRTB(firebase);
    const { getRoom } = roomsRTB(firebase);

    const [bookmarks, setBookmarks] = useState([]); // { bookmarkId, roomId, roomDetails }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookmarksAndRooms = async () => {
            try {
                const currentUser = firebase.auth.currentUser;
                if (!currentUser) {
                    setError("User not authenticated.");
                    setLoading(false);
                    return;
                }
                const uid = currentUser.uid;
                const rawBookmarks = await getBookmarks(uid);
                if (!rawBookmarks || Object.keys(rawBookmarks).length === 0) {
                    setBookmarks([]);
                    setLoading(false);
                    return;
                }

                const bookmarkEntries = Object.entries(rawBookmarks);

                // Fetch room details for each roomId
                const roomPromises = bookmarkEntries.map(async ([bookmarkId, bookmarkData]) => {
                    try {
                        const roomDetails = await getRoom(bookmarkData.roomId);
                        return {
                            bookmarkId,
                            roomId: bookmarkData.roomId,
                            roomDetails,
                        };
                    } catch {
                        return {
                            bookmarkId,
                            roomId: bookmarkData.roomId,
                            roomDetails: null,
                        };
                    }
                });

                const bookmarksWithDetails = await Promise.all(roomPromises);
                setBookmarks(bookmarksWithDetails);
            } catch (e) {
                setError("Failed to load bookmarks.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarksAndRooms();
    }, [firebase, getBookmarks, getRoom]);

    if (loading) return <Loader />;

    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    if (bookmarks.length === 0)
        return <div className="p-8 text-center text-gray-600">No bookmarks found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Your Bookmarked Rooms</h1>
            <ul className="space-y-4">
                {bookmarks.map(({ bookmarkId, roomId, roomDetails }) => (
                    <li key={bookmarkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {roomDetails ? (
                            <Link
                                to={`/room/${roomId}`}
                                className="flex hover:bg-gray-100 transition p-4 items-center gap-4"
                            >
                                <img
                                    src={roomDetails.images && roomDetails.images.length > 0 ? roomDetails.images[0].preview : "/assets/default-img.svg"}
                                    alt={roomDetails.name}
                                    className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                                    loading="lazy"
                                />
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{roomDetails.name}</h2>
                                    <p className="text-sm text-gray-600 truncate">{roomDetails.location}</p>
                                </div>
                                <p className="text-lg font-bold text-blue-700 whitespace-nowrap">₹{roomDetails.price}/mo</p>
                            </Link>
                        ) : (
                            <div className="p-4 text-gray-500 italic">
                                Room data is unavailable (maybe deleted).
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookmarks;
export { Bookmarks };
