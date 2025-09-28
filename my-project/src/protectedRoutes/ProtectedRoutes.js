import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const roleClaim = localStorage.getItem("roleClaim");
  const isAuthenticated = !!token;
  const isAdmin = roleClaim === "admin";

  if (!token) {
            toast.warning("Forbidden");
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.clear();
              toast.warning("Forbidden! Session expired!");

      return <Navigate to="/" replace />;
    }

    if (roleClaim !== "admin") {
        toast.warning("Forbidden");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
