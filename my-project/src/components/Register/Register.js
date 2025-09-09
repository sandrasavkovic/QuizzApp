import React, {useState} from "react";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: null,
    });

    const [err, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

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
            }
            else
                {
                    alert("Registration failed. Please try again.");
                    throw new Error("Registration failed");
                }
            
    }catch (err) {
            setError(err.message);
    }
    }

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registracija</h2>

        <input
          type="text"
          name="username"
          placeholder="Korisničko ime"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Lozinka"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Registruj se
        </button>
      </form>
    </div>
  );
}
export default Register;