import { useEffect, useState } from "react";
import { getApplicationsForMyJobs } from "../services/applicationService";

function RecruiterApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const data = await getApplicationsForMyJobs();
            setApplications(data);

        } catch (err) {

            console.error(err);

        }

    };

    return (

    <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Applications for Your Jobs 📊
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Manage and review candidates across all your job postings
            </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto">

            {applications.length === 0 ? (

                <div className="text-center text-gray-500 mt-16">
                    No applications yet 😕
                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {applications.map(app => (

                        <div
                            key={app.id}
                            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group"
                        >

                            {/* Job Title */}
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                                {app.jobTitle}
                            </h2>

                            {/* Divider */}
                            <div className="h-px bg-gray-200 my-3"></div>

                            {/* Applicant Info */}
                            <p className="text-sm text-gray-600">
                                👤 <span className="font-medium">{app.applicantName}</span>
                            </p>

                            {/* Date */}
                            <p className="text-xs text-gray-400 mt-2">
                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                            </p>

                            {/* Footer */}
                            <div className="mt-4 flex justify-between items-center">

                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    New Applicant
                                </span>

                                <button className="text-sm text-blue-600 hover:underline">
                                    View
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    </div>

);
}

export default RecruiterApplications;