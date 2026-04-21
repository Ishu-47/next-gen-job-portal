import { useEffect, useState } from "react";
import {
    getJobs,
    searchJobsByLocation,
    searchJobsBySkill
} from "../services/jobServices";

import JobCard from "../components/JobCard";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [location, setLocation] = useState("");
    const [skill, setSkill] = useState("");

    useEffect(() => {
        loadJobs();
    }, [page]);

    const loadJobs = async () => {
    try {

        const data = await getJobs(page, 5);

        console.log("API RESPONSE:", data);

        setJobs(data.content);
        setTotalPages(data.totalPages);

    } catch (err) {
        console.error(err);
    }
};

    const handleLocationSearch = async () => {

        if (!location) return;

        const data = await searchJobsByLocation(location);

        setJobs(data);

    };

    const handleSkillSearch = async () => {

        if (!skill) return;

        const data = await searchJobsBySkill(skill);

        setJobs(data);

    };

    const nextPage = () => {

        if (page < totalPages - 1) {
            setPage(page + 1);
        }

    };

    const prevPage = () => {

        if (page > 0) {
            setPage(page - 1);
        }

    };

    const resetJobs = () => {

        setPage(0);
        loadJobs();

    };

    return (

        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Find Your Next Opportunity 🚀
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Explore jobs based on your skills and preferences
            </p>
            </div>

            {/* Search Section */}

            <div className="max-w-7xl mx-auto bg-white p-5 rounded-2xl shadow-sm border mb-8">
                <div className="grid md:grid-cols-3 gap-3">
                <input
                    placeholder="Search by location..."
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    placeholder="Search by skill..."
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSkill(e.target.value)}
                />
                <div className="flex gap-2">
                <button
                    onClick={handleLocationSearch}
                    className="flex-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Location
                </button>
                <button
                    onClick={handleSkillSearch}
                    className="flex-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Skill
                </button>
                 <button
                        onClick={resetJobs}
                        className="bg-gray-300 px-3 rounded-lg hover:bg-gray-400 transition"
                    >
                        Reset
                    </button>

            </div>
            </div>
            </div>

            {/* Job List */}

            <div className="max-w-7xl mx-auto">
                {jobs.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        No jobs found 😕
                    </div>
                ):(<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
                </div>)}
                

            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-4 mt-10">

                <button
                    onClick={prevPage}
                    disabled={page === 0}
                    className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  ← Prev
                </button>

                <span className="text-sm text-gray-600">
                Page <span className="font-semibold">{page + 1}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
            </span>

                <button
                onClick={nextPage}
                disabled={page === totalPages - 1}
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
                Next →
            </button>

            </div>

        </div>

    );
}

export default Jobs;