import { useEffect, useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const [skills, setSkills] = useState([]);

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

        try {

            await registerUser(form);

            alert("Registration successful");
            navigate("/login");

        } catch (err) {

            console.error(err);
            alert("Registration failed");

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded w-96"
            >

                <h2 className="text-xl font-bold mb-4">
                    Register
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                >
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="EMPLOYER">Employer</option>
                </select>

                {/* Skill Selection */}

                <div className="mb-4">

                    <p className="font-semibold mb-2">
                        Select Skills
                    </p>

                    <div className="max-h-32 overflow-y-auto border p-2 rounded">

                        {skills.map(skill => (

                            <label key={skill.id} className="block">

                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={form.skillIds.includes(skill.id)}
                                    onChange={() => handleSkillChange(skill.id)}
                                />

                                {skill.name}

                            </label>

                        ))}

                    </div>

                </div>

                <button className="bg-blue-500 text-white p-2 w-full">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;