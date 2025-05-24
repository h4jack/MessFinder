import { useState, useEffect } from "react";
import { InputField, Button, Loader, SetRoleBox } from "../../components/ui";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../../context/firebase";
import { userRTB } from "../../context/firebase-rtb";
import useGoogleAuth from "../../context/useGoogleAuth"; // Import the new hook

const Login = () => {
    // State management
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

    // Login with email and password
    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage(""); // Clear previous errors
        try {
            const res = await signInWithEmailAndPassword(firebase.auth, email, password);
            const { getData } = userRTB(firebase);

            const userData = await getData(res.user.uid);
            if (userData?.role) {
                setErrorMessage("");
                navigate(`/${userData.role}/profile`, { state: { from: location } });
            } else {
                setErrorMessage("User role not found. Please contact support.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
        setLoading(false);
    };

    // New: Call the common Google sign-in handler
    const handleGoogleLogin = () => {
        handleGoogleSignIn(role);
    };

    const handleNavigateToRegister = () => {
        navigate('/auth/register', { state: { role: role } });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4">
            {!role ? (
                <SetRoleBox setRole={setRole} />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {loading || authLoading ? ( // Use authLoading from the hook
                        <Loader text="trying to Logging you in. please wait.." />
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                                Login as {" "}
                                <span
                                    title="Click to choose another role"
                                    onClick={() => setRole("")}
                                    className="text-teal-600 hover:text-teal-800 cursor-pointer underline-offset-4 hover:underline transition-all duration-200"
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </span>
                            </h2>

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
                                className="bg-teal-500 text-white hover:bg-teal-600"
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
                                onClick={handleGoogleLogin} // Use the new handler
                                className="bg-red-500 text-white hover:bg-red-600 mt-4 flex items-center justify-center"
                                disabled={authLoading} // Disable button when auth is loading
                            />

                            {/* Register Button */}
                            <div className="p-2 flex justify-center items-center gap-1">
                                <span>
                                    Don't have an account?{" "}
                                    <span
                                        onClick={handleNavigateToRegister} // Call the new navigation function
                                        className="text-blue-500 hover:underline cursor-pointer bg-transparent border-none p-0 inline-block" // Styling to make it look like a link
                                    >Register</span>
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </main>
    );
};

export default Login;