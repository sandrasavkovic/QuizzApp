import { useState, useEffect } from "react";
import { getThemes } from "../../../services/themeService";
import AddThemeForm from ".././forms/ThemeForms/AddThemeForm";
import EditThemeForm from "../forms/ThemeForms/EditThemeForm";
import { deleteTheme } from "../../../services/themeService";
import "./AdminThemes.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function AdminThemesPage() {
  const [themes, setThemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const data = await getThemes();
      setThemes(data);
    }
    fetchData();
  }, []);

  const handleThemeAdded = async () => {
    await refreshThemes(); // getQuestions() poziva backend i sada sva pitanja imaju Id
  };
  const refreshThemes = async () => {
    const data = await getThemes();
    setThemes(data);
  };
  //const handleThemeAdded = (theme) => setThemes(prev => [...prev, theme]);

  const handleThemeUpdated = (updatedTheme) => setThemes(prev => prev.map(t=>t.id === updatedTheme.id ? updatedTheme : t));

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this theme?")) return;

  try {
  const data = await deleteTheme(id);
   
   console.log(data);
    if(data.success){
    setThemes(prev => prev.filter(t => t.id !== id));
    toast.success("Theme deleted successfully!");
    }
    else{
      toast.error("This theme can't be deleted because it is used in quiz or there are questions on this theme!");
    }
  } catch (err) {
    console.error("Error deleting theme:", err);
    toast.error("Failed to delete theme");
     }
    };


  return (
    <div className="admin-themes-page">
      <h1>Themes</h1>
      <button className="btn btn-blue" onClick={() => setShowForm(true)}>Add Theme</button>
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
              <div className="button-container">
                  <button onClick={() => setEditingTheme(t)}>
                     <i className="bi bi-pen-fill"></i>
                  </button>
                  <button onClick={() => handleDelete(t.id)}>
                     <i className="bi bi-trash-fill"></i>
                  </button>
                    </div>
          </li>
        ))}
      </ul>
                  <button className="btn btn-blue" onClick={() => navigate("/main")}>Home</button>

    </div>
  )
}
export default AdminThemesPage;
