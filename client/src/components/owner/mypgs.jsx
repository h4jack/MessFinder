import React, { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { roomsRTB } from "../../context/firebase-rtb";
import { useFirebase } from "../../context/firebase";

const RoomCard = ({ roomData }) => {
    const pg = roomData;
    return (
        <div
            key={pg.id}
            className="w-56 rounded-lg shadow-md border border-gray-300 relative overflow-hidden bg-white"
        >
            <img
                src={pg.thumbnail}
                alt={pg.title}
                className="w-full h-36 object-cover mb-1"
            />
            <div className="p-2">
                <h2 className="text-lg font-semibold">{pg.title}</h2>
                <p className="text-sm text-gray-600">{pg.location}</p>
                <p className="text-sm font-bold text-gray-800">
                    {pg.price}
                </p>
                <table className="text-sm text-gray-600 mt-2 w-full">
                    <tbody>
                        {Object.entries(pg.details).map(([key, value]) => (
                            <tr key={key}>
                                <td className="pr-2 font-medium">{key}:</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">
                    Updated: {pg.updatedAt}
                </p>
                <div className="absolute top-2 right-2 flex space-x-2">
                    <a
                        href={`/owner/edit-room/${pg.id}`}
                        className="text-blue-500 hover:text-blue-700 p-2 bg-gray-100 rounded-md"
                    >
                        <FaEdit />
                    </a>
                    <a
                        href={`/room/${pg.id}`}
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
    const firebase = useFirebase();
    const { getRoom } = roomsRTB(firebase);

    const [pgData, setPGData] = useState([]);

    useEffect(() => {
        getRoom("")
            .then((res) => {
                const transformed = Object.entries(res).map(([roomId, data], index) => ({
                    roomId: index + 1,
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
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const [selectedTab, setSelectedTab] = React.useState("All");

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My PGs</h1>
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "All"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("All")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "Drafts"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("Drafts")}
                >
                    Drafts
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${selectedTab === "Posts"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => setSelectedTab("Posts")}
                >
                    Posts
                </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                {/* {pgData.map((pg, index) => (
                    <RoomCard key={index} roomData={pg} />
                ))} */}
            </div>
        </div>
    );
};

export default MyPGs;

