import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-3">
          Welcome back 👋
        </h1>
        <p className="text-blue-100 max-w-lg">
          Explore new opportunities, apply smarter, and take the next step in your career.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/jobs"
            className="bg-white text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* MAIN ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <Link
          to="/jobs"
          className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition group"
        >
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
            🔍 Find Jobs
          </h2>
          <p className="text-sm text-gray-500">
            Search and discover jobs based on your interests and skills.
          </p>
        </Link>

        <Link
          to="/my-applications"
          className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition group"
        >
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
            📄 My Applications
          </h2>
          <p className="text-sm text-gray-500">
            Track your job applications and their current status.
          </p>
        </Link>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">
            ⚡ Quick Tip
          </h2>
          <p className="text-sm text-gray-500">
            Applying early increases your chances of getting shortlisted.
          </p>
        </div>

      </div>

      {/* FEATURED SECTION */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border mb-10">
        <h2 className="text-xl font-semibold mb-4">
          🚀 Boost your chances
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">

          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-medium mb-1">Complete Profile</h3>
            <p>Add skills, projects, and experience to stand out.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-medium mb-1">Tailor Resume</h3>
            <p>Customize your resume for each job role.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-medium mb-1">Stay Active</h3>
            <p>Check new jobs daily and apply quickly.</p>
          </div>

        </div>
      </div>

      {/* EMPTY STATE / FUTURE SECTION */}
      <div className="bg-dashed border-2 border-gray-200 rounded-2xl p-8 text-center text-gray-400">
        <p className="text-sm">
          More features like interviews & analytics coming soon 🚧
        </p>
      </div>

    </div>
  );
}

export default Dashboard;