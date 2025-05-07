import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";

const RoomCard = ({ roomData }) => {
    const pg = roomData;
    return (
        <div
            key={pg.id}
            className="rounded-lg shadow-md relative overflow-hidden bg-white"
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
    const pgData = [
        {
            id: 1,
            thumbnail: "/assets/room1.png",
            title: "Sunrise PG",
            location: "Downtown, City",
            price: "$300/month",
            details: {
                "For": "Boys",
                "Suitable For": "Students, Working Professionals",
                "Shared": "Yes",
            },
            updatedAt: "2023-10-01",
        },
        {
            id: 2,
            thumbnail: "/assets/room3.png",
            title: "Moonlight PG",
            location: "Uptown, City",
            price: "$400/month",
            details: {
                "For": "Girls",
                "Suitable For": "Students",
                "Shared": "No",
            },
            updatedAt: "2023-09-25",
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My PGs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pgData.map((pg) => (
                    <RoomCard roomData={pg} />
                ))}
            </div>
        </div>
    );
};

export default MyPGs;

