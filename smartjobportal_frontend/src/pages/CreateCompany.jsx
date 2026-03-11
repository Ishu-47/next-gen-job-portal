import { useState } from "react";
import { createCompany } from "../services/companyService";

function CreateCompany() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        location: "",
        website: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCompany(form);

            alert("Company created");
        } catch (err) {
            alert("Error creating company");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Create Company
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Company Name"
                    onChange={handleChange}
                    className="border p-2 mb-3 w-full"
                />

                <input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="border p-2 mb-3 w-full"
                />

                <input
                    name="website"
                    placeholder="Website"
                    onChange={handleChange}
                    className="border p-2 mb-3 w-full"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border p-2 mb-3 w-full"
                />
                <button className="bg-blue-500 text-white px-4 py-2">
                    Create Company
                </button>
            </form>
        </div>
    );
}
export default CreateCompany;