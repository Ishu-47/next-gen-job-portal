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

    <nav className="bg-gray-800 text-white p-4 flex justify-between">

      <h1 className="font-bold text-lg">
        Smart Job Portal
      </h1>

      <div className="space-x-4">

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && role === "JOB_SEEKER" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/my-applications">My Applications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {token && role === "EMPLOYER" && (
          <>
            <Link to="/recruiter/dashboard">Dashboard</Link>
            <Link to="/post-job">Post Job</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>

    </nav>

  );
}

export default Navbar;