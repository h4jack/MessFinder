// ForgetPassword Component
import React, { useState } from "react";
import { InputField, Button } from "../ui/input";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResettPassword = () => {
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // "success" or "error"
    const [linkSent, setLinkSent] = useState(false);

    const firebase = useFirebase();

    const handleSendResetLink = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage("Please enter a valid email address.");
            setAlertType("error");
            return;
        }

        sendPasswordResetEmail(firebase.auth, email)
            .then((res) => {
                setAlertMessage("Password reset link sent to your email!");
                setAlertType("success");
                setLinkSent(true);
            }).catch((error) => {
                setAlertMessage("Error: Email not registered or invalid.");
                setAlertType("error");
            })
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
                {alertMessage && (
                    <p
                        className={`text-center mb-4 ${alertType === "success" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {alertMessage}
                    </p>
                )}
                {!linkSent ? (
                    <>
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <Button
                            text="Send Reset Link"
                            onClick={handleSendResetLink}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </>
                ) : (
                    <Link to="/auth/login">
                        <Button
                            text="Go to Login"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </Link>
                )}
            </div>
        </main>
    );
};

export default ResettPassword;
export { ResettPassword };
