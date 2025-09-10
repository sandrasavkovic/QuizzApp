import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"
function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: null,
    });

    const [err, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;
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

        const data = new FormData();
        data.append("Username", formData.username);
        data.append("Email", formData.email);
        data.append("Password", formData.password);
        if (formData.image) {
           // data.append("image", formData.image);
           data.append("ImageFile", formData.image);
        }
        for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

        try 
        {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                body: data,
            });
            if (response.ok)
            {
                alert("Registration successful! Please log in.");
                navigate("/login");
            }
            else
                {
                    
                    const errorText = await response.text();
                    alert(errorText);
                    throw new Error("Registration failed");
                }
            
    }catch (err) {
            setError(err.message);
    }
    }

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

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

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