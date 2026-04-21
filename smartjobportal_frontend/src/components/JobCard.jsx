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
        <div className="group border rounded-2xl shadow-sm p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {job.title}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
                {job.companyName}
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded-full">📍 {job.location}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">💰 ₹{job.salary}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🧑‍💻 {job.experienceRequired} yrs exp</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                {job.description}
            </p>
</div>
<div className="mt-5">
            <div className="flex justify-between text-xs text-gray-400 mb-3">
                <span>
                    {job.postedByUserName}
                </span>

                <span>
                    {formatDate(job.createdAt)}
                </span>
            </div>
            <button onClick={handleApply} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Apply Now
            </button>
           </div> 
        </div>
    );
}
export default JobCard;
