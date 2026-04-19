import { useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const [skills, setSkills] = useState([]);
    const[loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER",
        skillIds: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await API.get("/skills");
            setSkills(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSkillChange = (skillId) => {

        let updatedSkills;

        if (form.skillIds.includes(skillId)) {
            updatedSkills = form.skillIds.filter(id => id !== skillId);
        } else {
            updatedSkills = [...form.skillIds, skillId];
        }

        setForm({
            ...form,
            skillIds: updatedSkills
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            await registerUser(form);
            const res = await loginUser({
                email: form.email,
                password: form.password
            });
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if(role == "JOB_SEEKER"){
                navigate("/dashboard");
            } else {
                navigate("/recruiter/dashboard");
            }
        } catch (err) {
            console.error(err);
            alert("Registration failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-2"> 
                    Create your account
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Start your journey with Smartjobs 💼
                </p>
                
            
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                >
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="EMPLOYER">Employer</option>
                </select>
                
                <div>

                    <p className="text-sm font-semibold mb-2">
                        Select Skills
                    </p>

                    <div className="flex flex-wrap gap-2 max-h-32 overflow-auto">

                        {skills.map(skill => (

                            <span key={skill.id} onClick={() => handleSkillChange(skill.id)} className={`px-3 py-1 text-sm rounded-full cursor-pointer border transition 
                                        ${form.skillIds.includes(skill.id)
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}>
                                {skill.name}

                            </span>

                        ))}

                    </div>
                </div>

                <button
                type="submit"
                disabled={loading} 
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-500">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                    Login
                </span>
            </p>
        </div>
        </div>
    );
}

export default Register;