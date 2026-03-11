import { applyJob } from "../services/applicationService";

function JobCard({ job }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };
    const handleApply= async() =>  {
        try {
            await applyJob(job.id);
            alert("Application submitted");
        } catch (err){
            alert("Already applied or error");
        }
    };

    return (
        <div className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition">

            <h2 className="text-xl font-bold text-blue-600">
                {job.title}
            </h2>

            <p className="text-gray-600 font-medium">
                {job.companyName}
            </p>

            <p className="text-sm text-gray-500">
                📍 {job.location}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-700">
                <span>💰 ₹{job.salary}</span>
                <span>🧑‍💻 {job.experienceRequired} yrs exp</span>
            </div>
            <p className="mt-3 text-gray-700">
                {job.description}
            </p>

            <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>
                    Posted by: {job.postedByUsername}
                </span>

                <span>
                    {formatDate(job.createdAt)}
                </span>
            </div>
            <button onClick={handleApply} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Apply
            </button>
        </div>
    );
}
export default JobCard;
