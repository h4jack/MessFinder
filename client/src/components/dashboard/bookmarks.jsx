import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { bookmarksRTB, roomsRTB } from "../../context/firebase-rtb";
import { Loader } from "../ui/loader";

const Bookmarks = () => {
    const firebase = useFirebase();
    const { getBookmarks } = bookmarksRTB(firebase);
    const { getRoom } = roomsRTB(firebase);

    const [bookmarks, setBookmarks] = useState([]);
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

                const bookmarksWithDetails = await Promise.all(
                    Object.entries(rawBookmarks).map(async ([bookmarkId, bookmarkData]) => {
                        const roomDetails = await getRoom(bookmarkData.roomId).catch(() => null);
                        return { bookmarkId, roomId: bookmarkData.roomId, roomDetails };
                    })
                );

                setBookmarks(bookmarksWithDetails);
            } catch {
                setError("Failed to load bookmarks.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarksAndRooms();
    }, [firebase, getBookmarks, getRoom]);

    if (loading) return <Loader />;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
    if (bookmarks.length === 0) return <div className="p-6 text-center text-gray-600">No bookmarks found.</div>;

    return (
        <div className="max-w-[90%] md:max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center">Your Bookmarked Rooms</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map(({ bookmarkId, roomId, roomDetails }) => (
                    <li key={bookmarkId} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {roomDetails ? (
                            <Link to={`/room/${roomId}`} className="block hover:bg-gray-100 transition p-4">
                                <img
                                    src={roomDetails.images?.[0]?.preview || "/assets/default-img.svg"}
                                    alt={roomDetails.name}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <div className="mt-3">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{roomDetails.name}</h2>
                                    <p className="text-sm text-gray-600 truncate">{roomDetails.location}</p>
                                    <p className="text-lg font-bold text-blue-700 mt-2">₹{roomDetails.price}/mo</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-4 text-gray-500 italic text-center">
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
