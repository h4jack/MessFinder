import { useState } from "react";
import { FaUser, FaEnvelope, FaRegCommentDots } from "react-icons/fa";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Add your form submission logic here
    };

    const handleCancel = () => {
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg w-80 sm:w-120 p-6">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Contact Us</h2>
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

export {
    Contact
};
