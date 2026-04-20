import { Link } from "react-router-dom";

function Dashboard() {

  // TEMP dynamic placeholders (replace later with API)
  const applications = 12;
  const savedJobs = 5;
  const interviews = null; // not implemented yet

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back 👋
        </h1>
        <p className="text-sm text-blue-100">
          Track your progress and discover new opportunities.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Applications</h3>
          <p className="text-2xl font-bold mt-2">{applications}</p>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Saved Jobs</h3>
          <p className="text-2xl font-bold mt-2">{savedJobs}</p>
        </div>

        {/* Interviews */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Interviews</h3>

          {interviews !== null ? (
            <p className="text-2xl font-bold mt-2">{interviews}</p>
          ) : (
            <p className="text-sm text-gray-400 mt-2">
              Coming soon 🚧
            </p>
          )}
        </div>

      </div>
      <div className="grid md:grid-cols-2 gap-6">

        <Link
          to="/jobs"
          className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition group"
        >
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
            Browse Jobs
          </h2>
          <p className="text-sm text-gray-500">
            Discover jobs tailored to your skills.
          </p>
        </Link>

        <Link
          to="/my-applications"
          className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition group"
        >
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
            My Applications
          </h2>
          <p className="text-sm text-gray-500">
            Track your applications and status.
          </p>
        </Link>

      </div>

      <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">
          Tips to get hired faster 🚀
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Complete your profile with relevant skills</li>
          <li>• Apply to jobs early</li>
          <li>• Customize your resume for each role</li>
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;