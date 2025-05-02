import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

// InputField Component
function InputField({ label, type, value, onChange, placeholder, showToggle, toggleVisibility }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showToggle && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={toggleVisibility}
                    >
                        {type === "text" ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    );
}

// Button Component
function Button({ text, onClick, className }) {
    return (
        <button
            className={`w-full py-2 rounded-lg transition duration-200 ${className} cursor-pointer`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export {
    InputField,
    Button
}