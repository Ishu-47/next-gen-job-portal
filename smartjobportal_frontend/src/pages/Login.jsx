import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser({ email, password });

            const { token, role } = res;
            login(token);
            //localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "JOB_SEEKER") {
                navigate("/dashboard");
            } else {
                navigate("/recruiter/dashboard");
            }

        } catch (err) {
            alert("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Welcome back 👋
                </h2>
            
            <p className="text-sm text-gray-500 text-center mb-6">
                Login to continue to SmartJobs
            </p>
            <form
                onSubmit={handleSubmit}
                className="space-y-4">

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}
                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    {loading ? "Logging in.." : "Login"}
                </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-500">
                Don't have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={()=> navigate("/register")}>
                    Register
                </span>
            </p>
            </div>
        </div>
    );
};
export default Login;