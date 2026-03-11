import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Job Seeker Dashboard
      </h1>

      <div className="space-y-4">

        <Link
          to="/jobs"
          className="block bg-blue-500 text-white p-3 rounded"
        >
          Browse Jobs
        </Link>

        <Link
          to="/my-applications"
          className="block bg-green-500 text-white p-3 rounded"
        >
          My Applications
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;