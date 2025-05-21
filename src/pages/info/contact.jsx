import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaRegCommentDots } from "react-icons/fa";
import { useFirebase } from "../../context/firebase";
import { infoRTB } from "../../context/firebase-rtb";

const Contact = () => {
    const [formData, setFormData] = useState({
        uid: "",
        name: "",
        email: "",
        message: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const firebase = useFirebase();

    // Prefill form with user data if logged in
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setFormData((prev) => ({
                    ...prev,
                    uid: user.uid,
                    name: user.displayName || "",
                    email: user.email || "",
                }));
            }
        });
        return () => unsubscribe();
    }, [firebase.auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        const { contactUs } = infoRTB(firebase);
        const currentUser = firebase.auth.currentUser;

        if (!currentUser) {
            setErrorMessage("Due to spam concerns, you must be logged in to submit a message.");
            return;
        }

        if (!formData.uid || currentUser.uid !== formData.uid) {
            setErrorMessage("Invalid user session. Please log in again.");
            return;
        }

        if (!formData.email || !formData.email.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }


        if (!formData.message.trim()) {
            setErrorMessage("Message cannot be empty.");
            return;
        }

        try {
            await contactUs(formData);
            setSuccessMessage("Your message has been submitted successfully.");
            setFormData({
                uid: currentUser.uid,
                name: currentUser.displayName || "",
                email: currentUser.email || "",
                message: "",
            });
        } catch (error) {
            setErrorMessage("Failed to submit your message. Please try again later.");
        }
    };

    const handleCancel = () => {
        setFormData((prev) => ({
            ...prev,
            message: "",
        }));
        setErrorMessage("");
        setSuccessMessage("");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg w-80 sm:w-120 p-6">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Contact Us</h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border-b border-gray-400 py-2">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full outline-none px-2 py-1"
                            required
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-400 py-2">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full outline-none px-2 py-1"
                            required
                        />
                    </div>
                    <div className="flex items-start border-b border-gray-400 py-2">
                        <FaRegCommentDots className="text-gray-500 mr-2 mt-1" />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            className="w-full outline-none px-2 py-1 resize-none"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contact;
