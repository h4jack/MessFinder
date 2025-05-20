import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaFlag } from "react-icons/fa";
import { userRTB, roomsRTB } from "../../context/firebase-rtb"; // Adjust this path
import { useFirebase } from "../../context/firebase";     // Adjust this path


const OwnerPublicProfile = () => {
    const { username } = useParams();
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const firebase = useFirebase();

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

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

    return (
        <>

            <div className="bg-gray-50 w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
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

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                        <a href={`tel:${owner.phoneNumber}`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                <FaPhoneAlt /> Call
                            </button>
                        </a>

                        <a
                            href={`https://wa.me/${owner.phoneNumber}?text=${encodeURIComponent("Hi, I found your profile and I'm interested in a room.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                <FaWhatsapp /> WhatsApp
                            </button>
                        </a>

                        <button
                            onClick={() => alert("Report sent!")}
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
                                    <li key={room.roomId} className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
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
        </>
    );
};

export default OwnerPublicProfile;
