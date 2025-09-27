import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/authServices";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };
  

return (
  <div className="register-container">
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Registration</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="mb-3">
  <label htmlFor="image" className="btn btn-outline-primary w-100">
    <i className="bi bi-upload me-2"></i> Upload Image
  </label>
  <input
     type="file"
    id="image"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="d-none"
      style={{ display: "none" }}
  />
</div>


      {err && <p className="error">{err}</p>}

      <button type="submit">Sign up</button>

      <p>
        Alredy have an account? <a href="/login">Log in</a>
      </p>
    </form>
  </div>
);
}
export default Register;