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

        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Available Jobs
            </h1>

            {/* Search Section */}

            <div className="flex gap-3 mb-6">

                <input
                    placeholder="Search by location"
                    className="border p-2 flex-1"
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button
                    onClick={handleLocationSearch}
                    className="bg-blue-500 text-white px-4"
                >
                    Search
                </button>

            </div>

            <div className="flex gap-3 mb-6">

                <input
                    placeholder="Search by skill"
                    className="border p-2 flex-1"
                    onChange={(e) => setSkill(e.target.value)}
                />

                <button
                    onClick={handleSkillSearch}
                    className="bg-green-500 text-white px-4"
                >
                    Search
                </button>

                <button
                    onClick={resetJobs}
                    className="bg-gray-400 text-white px-4"
                >
                    Reset
                </button>

            </div>

            {/* Job List */}

            <div className="space-y-4">

                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}

            </div>

            {/* Pagination */}

            <div className="flex justify-center gap-4 mt-8">

                <button
                    onClick={prevPage}
                    disabled={page === 0}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Prev
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    onClick={nextPage}
                    disabled={page === totalPages - 1}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Next
                </button>

            </div>

        </div>

    );
}

export default Jobs;