import React, { useState } from "react";
import { InputField, Button } from "../universal/input";
import { FaGoogle } from "react-icons/fa";

// ForgetPassword Component
function ForgetPassword() {
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
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
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
                        <Button
                            text="Go to Login"
                            onClick={() => setStep(1)}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        />
                    </>
                )}
            </div>
        </main>
    );
}

// Login Component
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        alert("Login successful!");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    showToggle
                    toggleVisibility={() => setShowPassword(!showPassword)}
                />
                <Button
                    text="Login"
                    onClick={handleLogin}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                />
                <Button
                    text="Forgot Password?"
                    onClick={() => alert("Redirect to Forgot Password")}
                    className="text-blue-500 mt-4 hover:underline"
                />
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <Button
                    text="Register"
                    onClick={() => alert("Redirect to Register")}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                />
                <Button
                    text={<><FaGoogle className="mr-2" /> Sign in with Google</>}
                    onClick={() => alert("Google Sign-In")}
                    className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                />
            </div>
        </main>
    );
}

export { ForgetPassword, Login };
