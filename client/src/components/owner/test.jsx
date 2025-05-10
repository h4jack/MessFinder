import { useState } from "react";
import { ownerStorage } from "../../context/firebase-storage"; // Adjust the import path as necessary

const Test = ({ ownerId }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [downloadURL, setDownloadURL] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const { uploadProfileImage, deleteProfileImage } = ownerStorage();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError("");
            setUploadProgress(0); // Reset progress
        }
    };

    const handleUpload = async () => {
        try {
            const url = await uploadProfileImage(ownerId, file, setUploadProgress);
            setDownloadURL(url);
            setFile(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const message = await deleteProfileImage(ownerId);
            setDownloadURL("");
            setError(message);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>Upload</button>
            <button onClick={handleDelete}>Delete Profile Image</button>
            {uploadProgress > 0 && <div>Upload Progress: {uploadProgress.toFixed(0)}%</div>}
            {downloadURL && <img src={downloadURL} alt="Profile" style={{ maxWidth: "100px", marginTop: "10px" }} />}
            {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
    );
};

export default Test;
