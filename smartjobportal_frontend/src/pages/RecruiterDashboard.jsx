import { Link } from "react-router-dom";

function RecruiterDashboard() {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      <div className="space-y-4">

        <Link
          to="/create-company"
          className="block bg-blue-500 text-white p-3 rounded"
        >
          Create Company
        </Link>

        <Link
          to="/post-job"
          className="block bg-green-500 text-white p-3 rounded"
        >
          Post Job
        </Link>
        <Link
                    to="/recruiter/applications"
                    className="bg-purple-500 text-white px-4 py-2"
                >
                    View Applications
                </Link>


      </div>

    </div>
  );
}

export default RecruiterDashboard;