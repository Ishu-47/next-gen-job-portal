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

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Applications for My Jobs
            </h1>

            {applications.length === 0 ? (
                <p>No applications yet</p>
            ) : (
                <div className="space-y-4">

                    {applications.map(app => (

                        <div
                            key={app.id}
                            className="border p-4 rounded shadow"
                        >

                            <h2 className="font-semibold">
                                Job: {app.jobTitle}
                            </h2>

                            <p>
                                Applicant: {app.applicantName}
                            </p>

                            <p>
                                Applied At: {app.appliedAt}
                            </p>

                        </div>

                    ))}

                </div>
            )}

        </div>

    );
}

export default RecruiterApplications;