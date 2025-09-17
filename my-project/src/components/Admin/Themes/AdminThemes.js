import { useState, useEffect } from "react";
import { getThemes } from "../../../services/themeService";
import AddThemeForm from ".././forms/ThemeForms/AddThemeForm";
import EditThemeForm from "../forms/ThemeForms/EditThemeForm";
import { deleteTheme } from "../../../services/themeService";
import "./AdminThemes.css";

function AdminThemesPage() {
  const [themes, setThemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getThemes();
      setThemes(data);
    }
    fetchData();
  }, []);

  const handleThemeAdded = (theme) => setThemes(prev => [...prev, theme]);

  const handleThemeUpdated = (updatedTheme) => setThemes(prev => prev.map(t=>t.id === updatedTheme.id ? updatedTheme : t));

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this theme?")) return;

  try {
    await deleteTheme(id);
    setThemes(prev => prev.filter(t => t.id !== id));
    alert("Theme deleted successfully!");
  } catch (err) {
    console.error("Error deleting theme:", err);
    alert("Failed to delete theme");
     }
    };


  return (
    <div className="admin-themes-page">
      <h1>Themes</h1>
      <button onClick={() => setShowForm(true)}>Add Theme</button>
      {showForm && <AddThemeForm onThemeAdded={handleThemeAdded} onClose={() => setShowForm(false)} />}
       {editingTheme &&
        <EditThemeForm
          theme={editingTheme}
          onThemeUpdated={handleThemeUpdated}
          onClose={() => setEditingTheme(null)}
        />
      }
      <ul>
        {themes.map(t => (
          <li key={t.id}>
            {t.name}
                       <button onClick={() => setEditingTheme(t)}>Edit</button>
                        <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default AdminThemesPage;
