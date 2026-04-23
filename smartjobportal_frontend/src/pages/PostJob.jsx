import { useEffect, useState } from "react";
import { createJob } from "../services/jobServices";
import API from "../api/axios";

function PostJob() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experienceRequired: "",
    companyId: "",
    skillIds: []
  });

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
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
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
      const payload = {
        ...form,
        companyId: Number(form.companyId),
        skillIds: form.skillIds.map(id => Number(id))
      };

      await createJob(payload);

      alert("Job Created Successfully");

    } catch (err) {
      alert("Error creating job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Post a New Job 💼
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Find the perfect candidate for your role
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            name="title"
            value={form.title}
            placeholder="Job Title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            placeholder="Job Description"
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          {/* Row Inputs */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="location"
              value={form.location}
              placeholder="Location"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              value={form.salary}
              placeholder="Salary (₹)"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="experienceRequired"
              value={form.experienceRequired}
              placeholder="Experience Required (years)"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />

            <input
              name="companyId"
              value={form.companyId}
              placeholder="Company ID"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-semibold mb-2">
              Required Skills
            </p>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-auto">

              {skills.map(skill => (

                <span
                  key={skill.id}
                  onClick={() => handleSkillChange(skill.id)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer border transition 
                    ${form.skillIds.includes(skill.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {skill.name}
                </span>

              ))}

            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default PostJob;