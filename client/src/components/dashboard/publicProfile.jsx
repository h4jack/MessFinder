import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaFlag } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

import { userRTB, roomsRTB, chatRTB } from "../../context/firebase-rtb"; // Adjust this path
import { useFirebase } from "../../context/firebase";     // Adjust this path
import Loader from "../ui/loader";


const OwnerPublicProfile = () => {
    const { username } = useParams();
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    const firebase = useFirebase();
    const chat = chatRTB(firebase);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchUserByUsername = async () => {
            if (!username || username.length < 6) {
                setError("Invalid or too short username.");
                setLoading(false);
                return;
            }

            try {
                const { getAllUsers } = userRTB(firebase);
                const allUsers = await getAllUsers(); // ✅ not getData()

                if (!allUsers) {
                    setError("No users found.");
                    setLoading(false);
                    return;
                }

                // Find user with matching username
                const matchedUser = Object.values(allUsers).find(user => user.username === username);

                if (matchedUser) {
                    setOwner(matchedUser);
                    const { getAllRooms } = roomsRTB(firebase);
                    const allRooms = await getAllRooms();

                    // Filter rooms owned by this user
                    const userRooms = Object.entries(allRooms || {}).filter(
                        ([_, room]) => room.ownerId === matchedUser.id
                    ).map(([roomId, room]) => ({
                        roomId,
                        ...room
                    }));

                    setRooms(userRooms);

                } else {
                    setError("User not found.");
                }
            } catch (err) {
                console.error("Error fetching user by username:", err);
                setError("Failed to fetch user.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserByUsername();
    }, [username]);

    useEffect(() => {
        const cleaner = setTimeout(() => {
            setErrorMessage("");
        }, 2000);
        return () => clearTimeout(cleaner);
    }, [errorMessage]); // ← Also make sure this dependency is correct


    const handleChatClick = async () => {
        // ✅ Get the current user's UID
        const currentUser = firebase.auth.currentUser;
        if (!currentUser) {
            setErrorMessage("User not authenticated, Please Login first.");
            return;
        }

        const currentUserId = currentUser.uid;
        const ownerId = owner.id;

        // ✅ If the user is trying to chat with themselves, do nothing
        if (currentUserId === ownerId) {
            setErrorMessage("Cannot chat with yourself.");
            return;
        }

        // ✅ Call createChat with correct arguments (empty chat)
        try {
            const res = await chat.createChat(ownerId, currentUserId);
            navigate("/user/messages", { state: { chatId: res.chatId } })
            console.log(res.chatId);
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to create chat:");
        }
    };

    const handleReportChat = () => {
        // Navigate to /info/report/ with state
        navigate(`/info/report/`, {
            state: {
                userId: owner.id,
                username: owner.username
            }
        });
    };


    if (loading) return (
        <div className="min-h-screen flex justify-center items-center w-full bg-gray-50">
            <Loader text="Loading user profile data, please wait." />
        </div>
    );
    if (error) return <div className="min-h-screen w-full bg-gray-50 p-6 text-center text-red-500">{error || "Error Occured, Please refresh the page, else contact the admin if error persists.."}</div>;

    return (
        <>
            <main className="bg-gray-100 w-full min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white shadow-[10px_10px_2px] shadow-gray-300 overflow-hidden p-4">
                    <div className="max-w-3xl mx-auto p-6">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={owner.photoURL || "/assets/avatar-default.svg"}
                                alt="Owner Profile"
                                className="w-28 h-28 rounded-full object-cover border"
                            />
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-semibold text-gray-800">{owner.displayName}</h1>
                                <p className="text-gray-600">@{owner.username}</p>
                                <p className="text-gray-500">{owner.email}</p>
                                <p className="text-gray-500">{owner.phoneNumber}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
                            <p className="text-gray-600 whitespace-pre-line">
                                {owner.about || "No description provided."}
                            </p>
                        </div>
                        {/* Show Error Message */}
                        <span className="text-red-400 text-center">{errorMessage}</span>
                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                            <Link to={`tel:${owner.phoneNumber}`} className="flex-1">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    <FaPhoneAlt /> Call
                                </button>
                            </Link>

                            <button
                                onClick={handleChatClick}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-green-700">
                                <FiMessageCircle /> Chat
                            </button>

                            <button
                                onClick={handleReportChat}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                            >
                                <FaFlag /> Report
                            </button>
                        </div>
                    </div>
                    {
                        rooms.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">My Rooms</h2>
                                <ul className="space-y-4">
                                    {rooms.map((room) => (
                                        <li key={room.roomId} className="bg-gray-100 shadow-[3px_3px_5px] shadow-gray-300 overflow-hidden rounded-md">
                                            <Link
                                                to={`/room/${room.roomId}`}
                                                className="flex flex-col sm:flex-row hover:bg-gray-200 transition p-4 gap-4"
                                            >
                                                <img
                                                    src={room.images?.[0]?.preview || "/assets/default-img.svg"}
                                                    alt={room.name}
                                                    className="w-full sm:w-32 h-40 object-cover rounded-md"
                                                    loading="lazy"
                                                />
                                                <div className="flex flex-col flex-1 justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                                                        <p className="text-sm text-gray-600">{room.location}</p>
                                                    </div>
                                                    <p className="text-lg font-bold text-blue-700 mt-2 sm:mt-0 sm:self-end">₹{room.price}/month</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </main>
        </>
    );
};

export default OwnerPublicProfile;
