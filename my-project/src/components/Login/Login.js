import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { login } from "../../services/authServices"; 
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");   
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Submitting login for:", username, password);

      const data = await login(username, password);

      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);  

      const decodedToken = jwtDecode(data.token);
      console.log("Decoded token:", decodedToken);
      const roleClaim = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (roleClaim === "admin") {
        console.log("Navigating to admin page");
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message);
    }
  };
return (
  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Welcome Back</h2>

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Login</button>

      <p>
        Don’t have an account? <a href="/register">Sign up</a>
      </p>
    </form>
  </div>
);
}

export default Login;