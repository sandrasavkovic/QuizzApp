import "./AddThemeForm.css";
import { useState } from "react";
import { updateTheme } from "../../../../services/themeService";

function EditThemeForm({ theme, onThemeUpdated, onClose }) {
  const [themeName, setThemeName] = useState(theme.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!themeName.trim()) return;

    try {
      const updatedTheme = await updateTheme(theme.id, { name: themeName });
      onThemeUpdated(updatedTheme); // obavesti parent da je tema izmenjena
      onClose();
    } catch (err) {
      console.error("Error updating theme:", err);
      alert("Failed to update theme");
    }
  };

  return (
    <div className="add-theme-overlay">
      <form onSubmit={handleSubmit} className="add-theme-form">
        <h3>Edit Theme</h3>
        <label>Theme Name:</label>
        <input
          type="text"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" className="btn btn-gray" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditThemeForm;