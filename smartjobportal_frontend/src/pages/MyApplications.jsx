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
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                My Applications
            </h1>
            {applications.map((app) => (
                <div key={app.id} className="border p-4 mb-3 rounded">
                    <h2 className="font-bold">{app.jobTitle} </h2>
                    <p>Status: {app.status}</p>
                    <p>Match Score: {app.matchScore}</p>
                    <p>Applied At: {new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}
export default MyApplications;