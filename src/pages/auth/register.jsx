import React, { useEffect, useState } from "react";
import { InputField, Button, Loader, SetRoleBox } from "../../components/ui"; // Added Loader import
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../../context/firebase";
import { userRTB } from "../../context/firebase-rtb";
import useGoogleAuth from "../../context/useGoogleAuth"; // Import the new hook

const Register = () => {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state for email/password register

    const firebase = useFirebase();
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure values from the custom hook
    const { handleGoogleSignIn, authLoading, authError } = useGoogleAuth();

    useEffect(() => {
        if (location.state && location.state.role) {
            setRole(location.state.role);
        }
    }, [location.state]);

    // Update errorMessage when authError changes
    useEffect(() => {
        if (authError) {
            setErrorMessage(authError);
        } else {
            setErrorMessage(""); // Clear authError if it's resolved or initially empty
        }
    }, [authError]);


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

    const handleRegister = async () => {
        setLoading(true); // Start loading
        setErrorMessage(""); // Clear previous errors
        if (!validateInputs()) {
            setLoading(false);
            return;
        }
        if (!role) {
            setErrorMessage("Please select a role (User or Owner) first.");
            setLoading(false);
            return;
        }
        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then((res) => {
                if (res.user) {
                    const userData = {
                        id: res.user.uid,
                        displayName: res.user.displayName || "",
                        username: "",
                        email: res.user.email,
                        phoneNumber: "",
                        photoURL: res.user.photoURL || "",
                        dob: "",
                        role: role,
                        about: "",
                    };

                    userRTB(firebase)
                        .saveData(userData.id, { ...userData })
                        .then(() => {
                            setErrorMessage("");
                            navigate(`/${role}/profile`, { state: { from: location } });
                        })
                        .catch((err) => {
                            console.error("Failed to save user data:", err);
                            setErrorMessage("Failed to save user information. Please try again.");
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    setErrorMessage("Error with user, contact admin..");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("User already exists. Please login.");
                } else {
                    setErrorMessage("Error registering user. Please try again.");
                }
                setLoading(false);
            });

    };

    // New: Call the common Google sign-in handler
    const handleGoogleRegister = () => {
        handleGoogleSignIn(role);
    };

    const handleNavigateToLogin = () => {
        navigate('/auth/login', { state: { role: role } });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] p-4">
            {!role ? (
                <SetRoleBox setRole={setRole} />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {loading || authLoading ? ( // Use authLoading from the hook
                        <Loader text="Signing you up. please wait.." />
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                                Register as {" "}
                                <span
                                    title="Click to choose another role"
                                    onClick={() => setRole("")}
                                    className="text-blue-600 hover:text-blue-800 cursor-pointer underline-offset-4 hover:underline transition-all duration-200"
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </span>
                            </h2>
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
                                disabled={loading} // Disable button when loading
                            />
                            <div className="flex items-center my-4">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="mx-2 text-gray-500">OR</span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <Button
                                text={<><FaGoogle className="mr-2" /> Sign up with Google</>}
                                onClick={handleGoogleRegister} // Use the new handler
                                className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                                disabled={authLoading} // Disable button when auth is loading
                            />
                            {/* Login Button */}
                            <div className="p-2 flex justify-center items-center">
                                <span>
                                    Already have an account?{" "}
                                    <span
                                        onClick={handleNavigateToLogin} // Call the new navigation function
                                        className="text-blue-500 hover:underline cursor-pointer bg-transparent border-none p-0 inline-block" // Styling to make it look like a link
                                    >Login</span>
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}

export default Register;