import { useState } from "react";
import { InputField } from "../ui/input";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../../context/firebase";
import { ownerRTB } from "../../context/firebase-rtb";

const Login = () => {
    // State management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const firebase = useFirebase();

    const navigate = useNavigate();
    const location = useLocation();

    // Login with email and password
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(firebase.auth, email, password);
            setErrorMessage("");
            navigate("/owner/profile", { state: { from: location } });
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    // Login with Google
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase.auth, provider)
            .then((res) => {
                if (res.user) {
                    ownerRTB(firebase).getData(res.user.uid)
                        .then((exists) => {
                            if (exists) {
                                navigate("/owner/profile", { state: { from: location } });
                            } else {
                                const userData = {
                                    id: res.user.uid,
                                    displayName: res.user.displayName || "",
                                    username: "",
                                    email: res.user.email,
                                    phoneNumber: "",
                                    photoURL: res.user.photoURL || "",
                                    dob: "",
                                    about: "",
                                };
                                setErrorMessage(""); // Clear error message on success
                                ownerRTB(firebase).saveData(userData.id, { ...userData }).then(() => {
                                    navigate("/owner/profile", { state: { from: location } });
                                }).catch((error) => {
                                    console.error(error);
                                    setErrorMessage("Error, while creating user details on server.");
                                })
                            }
                        }).catch(() => {
                            setErrorMessage("Error, while fetching user details from server.");
                        })
                }
            }).catch(() => {
                setErrorMessage("Google login failed. Please try again.");
            });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                {/* Email Input */}
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />

                {/* Password Input */}
                <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    showToggle
                    toggleVisibility={() => setShowPassword((prev) => !prev)}
                />

                {/* Login Button */}
                <Button
                    text="Login"
                    onClick={handleLogin}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                />

                {/* Forgot Password Link */}
                <Link
                    to="/auth/forget-password"
                    className="text-blue-500 mt-4 hover:underline block text-center"
                >
                    Forgot Password?
                </Link>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="mx-2 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                {/* Google Login Button */}
                <Button
                    text={
                        <>
                            <FaGoogle className="mr-2" /> Sign in with Google
                        </>
                    }
                    onClick={handleLoginWithGoogle}
                    className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                />

                {/* Register Link */}
                <Link to="/auth/register" className="p-2 flex justify-center items-center gap-1">
                    <span>
                        Don't have an account?{" "}
                        <span className="text-blue-500 hover:underline cursor-pointer">
                            Register here
                        </span>
                    </span>
                </Link>
            </div>
        </main>
    );
};

export default Login;
