import { useState, useEffect } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { roomsRTB } from "../../context/firebase-rtb";
import { useFirebase } from "../../context/firebase";
import { capitalize } from "../../module/js/string";
import { formatRelativeTime } from "../../module/js/getTime";
import { Alert } from "../ui/alert"
import { Loader } from "../ui/loader"

const RoomCard = ({ roomData }) => {
    const pg = roomData;
    return (
        <div
            key={pg.roomId}
            className="w-56 rounded-lg shadow-md border border-gray-300 relative overflow-hidden bg-white"
        >
            <img
                src={pg.thumbnail}
                alt={pg.name}
                className="w-full h-36 object-cover mb-1 shadow-sm"
            />
            <div className="p-2">
                <h2 className="text-lg font-semibold">{pg.name}</h2>
                <p className="text-sm text-gray-600">{pg.location}</p>
                <p className="text-sm font-bold text-gray-800">
                    {pg.price}
                </p>
                <table className="text-sm text-gray-600 mt-2 w-full">
                    <tbody>
                        <tr>
                            <td className="pr-2 font-medium">Accomodation for:</td>
                            <td>{pg.messInfo.accommodationFor}</td>
                        </tr>
                        <tr>
                            <td className="pr-2 font-medium">Suitable for:</td>
                            <td>{pg.messInfo.suitableFor}</td>
                        </tr>
                        <tr>
                            <td className="pr-2 font-medium">Shared:</td>
                            <td>{pg.messInfo.shared ? `with ${1} mate` : "No"}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">
                    Updated: {pg.updatedAt}
                </p>
                <div className="absolute top-2 right-2 flex space-x-2">
                    <a
                        href={`/owner/submit-pg/${pg.roomId}`}
                        className="text-blue-500 hover:text-blue-700 p-2 bg-gray-100 rounded-md"
                    >
                        <FaEdit />
                    </a>
                    <a
                        href={`/room/${pg.roomId}`}
                        className="text-green-500 hover:text-green-700 p-2 bg-gray-100 rounded-md"
                    >
                        <FaEye />
                    </a>
                </div>
            </div>
        </div>
    )
}

const MyPGs = () => {
    capitalize
    const firebase = useFirebase();
    const { getRoom } = roomsRTB(firebase);

    const [pgData, setPGData] = useState([]);
    const [selectedTab, setSelectedTab] = useState("all");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {
        setLoading(true);
        getRoom("")
            .then((res) => {
                // Convert the response to an array of [roomId, data]
                let entries = Object.entries(res);

                // Apply filtering based on selectedTab
                if (selectedTab.toLowerCase() === "draft") {
                    entries = entries.filter(([_, data]) => data.status?.toLowerCase() === "draft");
                } else if (selectedTab.toLowerCase() === "public") {
                    entries = entries.filter(([_, data]) => data.status?.toLowerCase() === "public");
                }

                // Map the filtered entries to the required format
                const transformed = entries.map(([roomId, data]) => ({
                    roomId: roomId,
                    thumbnail: data.images?.[0]?.preview || "/assets/default.png",
                    name: data.name,
                    location: `${data.location}, ${data.district}`,
                    price: `₹${data.price}/month`,
                    messInfo: {
                        accommodationFor: capitalize(data.accommodationFor),
                        suitableFor: capitalize(data.suitableFor),
                        shared: data.shared,
                    },
                    updatedAt: formatRelativeTime(data.updatedAt),
                }));

                setPGData(transformed);
                setErrorMessage(false)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage("Error while getting, your room details..")
            });
    }, [selectedTab]);

    if (errorMessage) {
        return <Alert message={errorMessage} />;
    }

    if (loading) {
        return <Loader text="Loading your data.. please" />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My PGs</h1>
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "all"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("all")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "draft"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("draft")}
                >
                    Drafts
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "public"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("public")}
                >
                    Posts
                </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {pgData.length > 0 ? (
                    pgData.map((pg, index) => (
                        <RoomCard key={index} roomData={pg} />
                    ))
                ) : (
                    <p className="text-center text-3xl w-full text-gray-500">No rooms available.</p>
                )}
            </div>
        </div>
    );
};

export default MyPGs;

