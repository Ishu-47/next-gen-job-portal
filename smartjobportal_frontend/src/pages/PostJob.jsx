import { useState } from "react";
import { createJob } from "../services/jobServices";

function PostJob() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experienceRequired: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createJob(form);

      alert("Job Created Successfully");

    } catch {

      alert("Error creating job");

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Post Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="title"
          placeholder="Job Title"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="salary"
          placeholder="Salary"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="experienceRequired"
          placeholder="Experience"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2">
          Post Job
        </button>

      </form>

    </div>

  );
}

export default PostJob;