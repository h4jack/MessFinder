import { ref, get, set, remove, update, serverTimestamp } from "firebase/database";

const ownerRTB = (firebase) => {

    const saveData = async (id, data) => {
        try {
            if (!id || !(data.email || data.id)) {
                throw new Error("Missing required user information.");
            }

            const dbRef = ref(firebase.db, `/mess-finder/users/owner/${id}`);
            const snapshot = await get(dbRef);
            const exists = snapshot.exists();

            const timestampData = {
                updatedAt: serverTimestamp(),
                ...(exists ? {} : { createdAt: serverTimestamp() }),
            };

            const newData = {
                ...data,
                ...timestampData,
            };

            await update(dbRef, newData); // use update to preserve existing data and apply server timestamps

            return { status: true, message: exists ? "Data updated." : "User created." };
        } catch (error) {
            throw error;
        }
    };



    const deleteData = async (id) => {
        try {
            const dbRef = ref(firebase.db, `/mess-finder/users/owner/${id}`);
            await remove(dbRef);
            return { status: true, message: "Deleted Successfully" };
        } catch (error) {
            throw error; // Throw the error to allow .catch() to handle it
        }
    };

    const getData = async (id) => {
        try {
            const dbRef = ref(firebase.db, `/mess-finder/users/owner/${id}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return null;
            }
        } catch (error) {
            throw error; // Throw the error to allow .catch() to handle it
        }
    };

    const userExists = async (username) => {
        // 1. Validate format: starts with a-z, can include numbers and underscores
        const valid = /^[a-z][a-z0-9_]*$/.test(username);
        if (!valid) {
            return { valid: false, available: false, reason: "Invalid username format." };
        }

        try {
            const allUsersRef = ref(firebase.db, "/mess-finder/users/owner");
            const snapshot = await get(allUsersRef);
            if (!snapshot.exists()) {
                return { valid: true, available: true }; // No users yet, username is available
            }

            const users = snapshot.val();
            for (const id in users) {
                if (users[id].username === username) {
                    return { valid: true, available: false, reason: "Username already taken." };
                }
            }

            return { valid: true, available: true };
        } catch (error) {
            console.error("Error checking username existence:", error);
            throw error;
        }
    };

    return { saveData, deleteData, getData, userExists };
};


const roomsRTB = (firebase) => {
    const baseRef = ref(firebase.db, "/mess-finder/rooms");

    const saveRoom = async (roomData, roomId = null) => {
        try {
            const timestampData = {
                updatedAt: serverTimestamp(),
                ...(roomId ? {} : { createdAt: serverTimestamp() }),
            };

            const newData = {
                ...roomData,
                ...timestampData,
            };

            let roomRef;

            if (roomId) {
                // Update existing room
                roomRef = ref(firebase.db, `/mess-finder/rooms/${roomId}`);
                await update(roomRef, newData);
                return { status: true, message: "Room updated.", roomId };
            } else {
                // Create new room with auto-generated ID
                roomRef = push(baseRef); // this creates a new unique ID
                await set(roomRef, newData);
                return { status: true, message: "Room created.", roomId: roomRef.key };
            }
        } catch (error) {
            throw error;
        }
    };

    const deleteRoom = async (roomId) => {
        try {
            const roomRef = ref(firebase.db, `/mess-finder/rooms/${roomId}`);
            await remove(roomRef);
            return { status: true, message: "Room deleted." };
        } catch (error) {
            throw error;
        }
    };

    const getRoom = async (roomId) => {
        try {
            const roomRef = ref(firebase.db, `/mess-finder/rooms/${roomId}`);
            const snapshot = await get(roomRef);
            return snapshot.exists() ? snapshot.val() : null;
        } catch (error) {
            throw error;
        }
    };

    const getAllRooms = async () => {
        try {
            const snapshot = await get(baseRef);
            return snapshot.exists() ? snapshot.val() : {};
        } catch (error) {
            throw error;
        }
    };

    return {
        saveRoom,     // create or update
        deleteRoom,
        getRoom,
        getAllRooms,
    };
};

export default { roomsRTB, ownerRTB };

export {
    roomsRTB,
    ownerRTB
};
