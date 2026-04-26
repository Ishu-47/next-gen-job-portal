import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
        return <Navigate to="/login" />
    }

    if (roleRequired && role !== roleRequired) {
        if (role !== "JOB_SEEKER") {
            return <Navigate to="/recruiter/dashboard" />;
        } else {
            return <Navigate to="/dashboard" />;
        }
    }
    return children;
}
export default ProtectedRoute;