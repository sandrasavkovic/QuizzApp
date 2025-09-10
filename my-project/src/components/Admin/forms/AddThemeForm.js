import { useState } from "react";

function AddThemeForm({ onThemeAdded }) {
  const [themeName, setThemeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!themeName.trim()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/theme/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ Name: themeName }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create theme");
      }

      const newTheme = await response.json();
      setThemeName("");           // reset inputa
      onThemeAdded(newTheme);     // callback za parent komponentu
    } catch (err) {
      console.error("Error creating theme:", err);
      alert("Failed to add theme");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <label>Add new theme:</label>
      <input
        type="text"
        value={themeName}
        placeholder="Enter theme name"
        onChange={(e) => setThemeName(e.target.value)}
        required
      />
      <button type="submit">Add Theme</button>
    </form>
  );
}

export default AddThemeForm;
