import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useFirebase } from "./firebase"; // Adjust the import path as necessary

const ownerStorage = () => {
    const firebase = useFirebase();

    const uploadProfileImage = async (ownerId, file, onProgress) => {
        if (!file) {
            throw new Error("No file provided for upload.");
        }

        const storageRef = ref(firebase.storage, `mess-finder/${ownerId}/profile.png`);

        // Create a reference to the file to be uploaded
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Calculate progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    if (onProgress) {
                        onProgress(progress); // Call the progress callback
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(new Error("Upload failed: " + error.message));
                },
                async () => {
                    // Handle successful uploads
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(new Error("Failed to get download URL: " + error.message));
                    }
                }
            );
        });
    };

    const deleteProfileImage = async (ownerId) => {
        const storageRef = ref(firebase.storage, `mess-finder/${ownerId}/profile.png`); // Adjust extension if needed

        return new Promise((resolve, reject) => {
            deleteObject(storageRef)
                .then(() => {
                    resolve("Profile image deleted successfully.");
                })
                .catch((error) => {
                    reject(new Error("Delete failed: " + error.message));
                });
        });
    };

    return {
        uploadProfileImage,
        deleteProfileImage,
    };
};

export { ownerStorage };
