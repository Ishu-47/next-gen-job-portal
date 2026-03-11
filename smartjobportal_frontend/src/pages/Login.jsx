import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
    // const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });

            const { token, role } = res;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "JOB_SEEKER") {
                navigate("/dashboard");
            } else {
                navigate("/recruiter/dashboard");
            }

            alert("Login successful");

        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>


                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-500 text-white p-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
};
export default Login;