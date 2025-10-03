import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("authToken");
  const userRole = (localStorage.getItem("role") || "").trim();

  if (!token) return <Navigate to="/" />;

  if (role && userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
}
