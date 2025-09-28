import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const roleClaim = localStorage.getItem("roleClaim");
  

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

    if (role === "admin" && roleClaim !== "admin") {
      toast.warning("Forbidden: Admins only!");
      return <Navigate to="/" replace />;
    }

    // Ako se traži običan user (ili bilo ko ulogovan)
    if (role === "user" && roleClaim !== "user") {
      toast.warning("Forbidden: Users only!");
      return <Navigate to="/" replace />;
    }

    // Ako se ne prosledi role, znači da je dovoljno da bude bilo ko ulogovan
    if (!role && roleClaim !== "user" && roleClaim !== "admin") {
      toast.warning("You must log in!");
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
