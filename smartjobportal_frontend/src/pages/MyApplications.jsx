import { useEffect, useState } from "react";
import { getMyApplicatons } from "../services/applicationService";

function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplication();
    }, []);
    const loadApplication = async() => {
        const data = await getMyApplicatons();
        setApplications(data);
    };
    return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                My Applications 📄
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Track your job applications and progress
            </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto">

            {applications.length === 0 ? (

                <div className="text-center text-gray-500 mt-16">
                    You haven't applied to any jobs yet 😕
                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {applications.map((app) => (

                        <div
                            key={app.id}
                            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                        >

                            {/* Job Title */}
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                {app.jobTitle}
                            </h2>

                            {/* Status Badge */}
                            <span
                                className={`inline-block text-xs px-3 py-1 rounded-full font-medium mb-3
                                    ${app.status === "APPLIED" && "bg-blue-100 text-blue-700"}
                                    ${app.status === "SHORTLISTED" && "bg-green-100 text-green-700"}
                                    ${app.status === "REJECTED" && "bg-red-100 text-red-700"}
                                `}
                            >
                                {app.status}
                            </span>

                            {/* Match Score */}
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-1">
                                    Match Score
                                </p>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${app.matchScore}%` }}
                                    ></div>
                                </div>

                                <p className="text-xs text-gray-500 mt-1">
                                    {app.matchScore}%
                                </p>
                            </div>

                            {/* Date */}
                            <p className="text-xs text-gray-400">
                                Applied on{" "}
                                {new Date(app.appliedAt).toLocaleDateString()}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    </div>
);
}
export default MyApplications;