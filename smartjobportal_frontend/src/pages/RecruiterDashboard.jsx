import { Link } from "react-router-dom";

function RecruiterDashboard() {

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HERO */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-2">
            Recruiter Dashboard 🚀
          </h1>
          <p className="text-sm text-indigo-100">
            Manage your company, post jobs, and hire the best talent
          </p>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Create Company */}
        <Link
          to="/create-company"
          className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-3">🏢</div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
            Create Company
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Set up your company profile to start hiring
          </p>
        </Link>

        {/* Post Job */}
        <Link
          to="/post-job"
          className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-3">💼</div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600">
            Post Job
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create and publish job listings for candidates
          </p>
        </Link>

        {/* View Applications */}
        <Link
          to="/recruiter/applications"
          className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-3">📄</div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600">
            View Applications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage candidate applications
          </p>
        </Link>

      </div>

      {/* EXTRA SECTION (premium touch) */}
      <div className="max-w-7xl mx-auto mt-10 bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">
          Hiring Tips 💡
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Write clear and detailed job descriptions</li>
          <li>• Highlight required skills accurately</li>
          <li>• Review applications regularly for best candidates</li>
        </ul>
      </div>

    </div>
  );
}

export default RecruiterDashboard;