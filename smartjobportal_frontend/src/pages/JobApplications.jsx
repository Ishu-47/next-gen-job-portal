import { useEffect, useState } from "react";
import { getApplicationsByJob } from "../services/applicationService";
import { useParams } from "react-router-dom";

function JobApplications() {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {

    const data = await getApplicationsByJob(jobId);

    setApplications(data);

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Applications
      </h1>

      {applications.map((app) => (

        <div
          key={app.id}
          className="border p-4 mb-3 rounded"
        >

          <h2 className="font-bold">
            {app.applicantName}
          </h2>

          <p>Status: {app.status}</p>

          <p>Match Score: {app.matchScore}</p>

        </div>

      ))}

    </div>

  );
}

export default JobApplications;