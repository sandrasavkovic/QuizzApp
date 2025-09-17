import { useState } from "react";
import { createTheme } from "../../../../services/themeService";
import "./AddThemeForm.css"
function AddThemeForm({ onThemeAdded, onClose }) {
  const [themeName, setThemeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!themeName.trim()) return;

    try {
      const newTheme = await createTheme(themeName);
      setThemeName("");           // reset inputa
      onThemeAdded(newTheme);     // callback za parent komponentu
      alert("New theme added successfully!")
    } catch (err) {
      console.error("Error creating theme:", err);
      alert("Failed to add theme");
    }
  };

  return (
    <div className="add-theme-overlay">
  <form onSubmit={handleSubmit} className="add-theme-form">
    <h3>Add New Theme</h3>
    <label>Theme Name:</label>
    <input
      type="text"
      value={themeName}
      placeholder="Enter theme name"
      onChange={(e) => setThemeName(e.target.value)}
      required
    />
    <div className="form-buttons">
    <button type="submit">Add Theme</button>
    <button type="button" className="btn btn-gray" onClick={onClose}>Cancel</button>
  </div>
  </form>
  </div>
);

}

export default AddThemeForm;
