import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

      <h1 onClick={()=> navigate("/")} className="text-xl font-bold text-blue-600 cursor-pointer">
        Smart Job Portal
      </h1>

      <div className="flex items-center gap-6 text-sm font-medium">

        {!token && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Register
            </Link>
          </>
        )}

        {token && role === "JOB_SEEKER" && (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">Jobs</Link>
            <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 transition">My Applications</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
          </>
        )}

        {token && role === "EMPLOYER" && (
          <>
            <Link to="/recruiter/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition">Post Job</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
          </>
        )}

      </div>
      </div>
    </nav>

  );
}

export default Navbar;