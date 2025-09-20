import "./AddThemeForm.css";
import { useState } from "react";
import { updateTheme } from "../../../../services/themeService";
import { toast } from "react-toastify";

function EditThemeForm({ theme, onThemeUpdated, onClose }) {
  const [themeName, setThemeName] = useState(theme.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!themeName.trim()) return;

    try {
      const data = await updateTheme(theme.id, { name: themeName });
      console.log(data);
      if(data.success){
      onThemeUpdated(data.updatedTheme); // obavesti parent da je tema izmenjena
      onClose();
      toast.success("Theme updated successfully!")
      }
      else{
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error updating theme:", err);
      toast.error("Failed to update theme");
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