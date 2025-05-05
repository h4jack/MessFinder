// ForgetPassword Component
import React, { useState } from "react";
import { InputField, Button } from "../universal/input";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSendOtp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setSuccessMessage("");
            return;
        }
        setErrorMessage("");
        setSuccessMessage("OTP sent to your email!");
        setStep(2);
    };

    const handleVerifyOtp = () => {
        if (otp.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit OTP.");
            setSuccessMessage("");
            return;
        }
        setErrorMessage("");
        setSuccessMessage("OTP verified!");
        setStep(3);
    };

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setSuccessMessage("");
            return;
        }
        setErrorMessage("");
        setSuccessMessage("Password reset successful!");
        setStep(4);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {step === 1 && (
                    <>
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                        {!errorMessage && successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <Button
                            text="Send OTP"
                            onClick={handleSendOtp}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>
                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                        {!errorMessage && successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                        <InputField
                            label="OTP"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the OTP"
                        />
                        <Button
                            text="Verify OTP"
                            onClick={handleVerifyOtp}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                        {!errorMessage && successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                        <InputField
                            label="New Password"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            showToggle
                            toggleVisibility={() => setShowNewPassword(!showNewPassword)}
                        />
                        <InputField
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            showToggle
                            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                        <Button
                            text="Reset Password"
                            onClick={handleResetPassword}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Success</h2>
                        <p className="text-center text-gray-700 mb-6">Your password has been reset successfully!</p>
                        <Link to="/login">
                            <Button
                                text="Go to Login"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            />
                        </Link>

                    </>
                )}
            </div>
        </main>
    );
}

export default ForgetPassword;
export { ForgetPassword };