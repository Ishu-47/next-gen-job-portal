import { useEffect, useState } from "react";
import { createJob } from "../services/jobServices";
import API from "../api/axios";

function PostJob() {

  const [skills, setSkills] = useState([]);
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

  // 🔥 SAME LOGIC AS REGISTER PAGE
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
      const payload = {
        ...form,
        companyId: Number(form.companyId)
      };

      await createJob(payload);

      alert("Job Created Successfully");

      // reset
      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        experienceRequired: "",
        companyId: "",
        skillIds: []
      });

    } catch (err) {
      console.error(err);
      alert("Error creating job");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Post Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="title"
          value={form.title}
          placeholder="Job Title"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          value={form.location}
          placeholder="Location"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="salary"
          value={form.salary}
          placeholder="Salary"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="experienceRequired"
          value={form.experienceRequired}
          placeholder="Experience Required"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="companyId"
          value={form.companyId}
          placeholder="Company ID"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        {/* 🔥 SKILL SELECTOR (same as register) */}
        <div>
          <p className="text-sm font-semibold mb-2">
            Select Skills
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

        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;