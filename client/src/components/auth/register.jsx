import React, { useEffect, useState } from "react";
import { InputField } from "../ui/input";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../../context/firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const firebase = useFirebase();
    const user = firebase.auth.currentUser;

    const navigate = useNavigate();
    const location = useLocation();

    const validateInputs = () => {
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Invalid Email Address.");
            return false;
        }
        if (!password) {
            setErrorMessage("Password is required.");
            return false;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        setErrorMessage(""); // Clear error message if all validations pass
        return true;
    };

    const handleRegister = () => {
        if (!validateInputs()) return;

        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then(() => {
                // User registered successfully
                setErrorMessage(""); // Clear error message on success
                navigate("/owner/profile", { state: { from: location } });
            })
            .catch((error) => {
                // Handle registration errors
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("User already exists. Please login.");
                } else {
                    setErrorMessage("Error registering user. Please try again.");
                }
            });
    };

    // Login with Google
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase.auth, provider)
            .then(() => {
                navigate("/owner/profile", { state: { from: location } });
            })
            .catch(() => {
                setErrorMessage("Google login failed. Please try again.");
            });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
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
                    onClick={handleLoginWithGoogle}
                    className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                />
                <Link to="/auth/login" className="p-2 flex justify-center items-center">
                    <span>
                        Already have an account?{" "}
                        <span className="text-blue-500 hover:underline cursor-pointer"> Login</span>
                    </span>
                </Link>
            </div>
        </main>
    );
}

export default Register;
export { Register };