import { ref, get, set, remove, update } from "firebase/database";

const ownerRTB = (firebase) => {
    const saveData = async (
        id,
        data = {
            id: "",
            displayName: "",
            username: "",
            email: "",
            phoneNumber: "",
            photoURL: "",
            dob: "",
            about: "",
        }
    ) => {
        try {
            if (!id || !(data.email || data.id)) {
                throw new Error("Missing required user information.");
            }

            const dbRef = ref(firebase.db, `/mess-finder/users/owner/${id}`);
            await set(dbRef, data);

            return { status: true, message: "Data saved successfully." };
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

    return { saveData, deleteData, getData };
};

export default ownerRTB;
export { ownerRTB };
