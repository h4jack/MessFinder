import React, { useState } from "react";
import { InputField, Button } from "../universal/input";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        alert("Registration successful!");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
                <InputField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
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
                <InputField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    showToggle
                    toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                <p className="text-sm text-gray-600 mb-4">
                    By registering, you accept our{" "}
                    <Link to="/terms" className="text-blue-500 hover:underline">
                        Terms and Conditions
                    </Link>.
                </p>
                <Button
                    text="Register"
                    onClick={handleRegister}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                />
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="mx-2 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <Button
                    text={<><FaGoogle className="mr-2" /> Sign up with Google</>}
                    onClick={() => alert("Google Sign-Up")}
                    className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                />
                <Link to="/login" className="p-2 flex justify-center items-center">
                    <span>
                        Already have an account? {" "}
                        <span className="text-blue-500 hover:underline cursor-pointer"> Login</span>
                    </span>
                </Link>
            </div>
        </main>
    );
}


export { Register };