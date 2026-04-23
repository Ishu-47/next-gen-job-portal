import { useState } from "react";
import { createCompany } from "../services/companyService";

function CreateCompany() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        location: "",
        website: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createCompany(form);

            alert("Company created successfully ✅");

            setForm({
                name: "",
                description: "",
                location: "",
                website: ""
            });

        } catch (err) {
            alert(err?.response?.data?.message || "Error creating company ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">

        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

            {/* Header */}
            <h1 className="text-2xl font-bold text-center mb-2">
                🏢 Create Company
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
                Set up your company profile to start hiring
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <input
                    name="name"
                    value={form.name}
                    placeholder="🏷️ Company Name"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                />

                {/* Location + Website */}
                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        name="location"
                        value={form.location}
                        placeholder="📍 Location"
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <input
                        name="website"
                        value={form.website}
                        placeholder="🌐 Website (optional)"
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                </div>

                {/* Description */}
                <textarea
                    name="description"
                    value={form.description}
                    placeholder="📝 Company Description"
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    {loading ? "Creating..." : "Create Company"}
                </button>

            </form>

        </div>
    </div>
);
}

export default CreateCompany;