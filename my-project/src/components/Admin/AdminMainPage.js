import {useState, useEffect, use} from "react";
import jwtDecode from "jwt-decode";
import "./AdminMainPage.css";  
import { getQuizzes } from "../../services/quizServices";
import AddQuestionForm from "./forms/AddQuestionForm";
import { getThemes } from "../../services/themeService";
import AddThemeForm from "./forms/AddThemeForm";
import AddQuizForm from "./forms/AddQuizForm";


function AdminMainPage() {
    const [quizzes, setQuizess] = useState([]);
    // forme za dodavanje su odvojene komponente, ovde ih
    // samo prikazujemo
    const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
    const [themes, setThemes] = useState([]);
    const [themeName, setThemeName] = useState("");
    const [themeForm, setThemeForm] = useState(false);
    const [quizzForm, setQuizzForm] = useState(false);
    const difficultyMap = {
      0: "Easy",
      1: "Medium",
      2: "Hard"
    };

    const fetchQuizzes = async () => {
        try{
            const data = await getQuizzes();
            setQuizess(data);   
        }catch(error){
            console.error("Error fetching quizzes:", error);
        }
    };

    const fetchThemes = async () =>
    {
        try 
        {
            const data = await getThemes();
            setThemes(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
        useEffect(() => {
            fetchQuizzes();
            fetchThemes();
        }, []);
    const handleOpenQuiz = (quiz) => {
        // detalji kviza
        alert(`Open quiz: ${quiz.title}`);
    }
    const handleAddQuestionClick = () =>
    {
        setShowAddQuestionForm(true);
    }

    const handleCloseQuestionForm = () => 
    {
        setShowAddQuestionForm(false);
    }

    const handleQuestionCreated = (newQuestion) =>
    {
        // mozda refresh liste 
        setShowAddQuestionForm(false);
    }

     const handleThemeAdded = (newTheme) => {
      setThemes((prev) => [...prev, newTheme]); // dodajemo u listu tema
    //  setThemeForm(false);
    };

      const openThemeForm = () =>
      {
        setThemeForm(true);
      }
      const handleCloseThemeForm = () =>
      {
        setThemeForm(false);
      }

      const openQuizzForm = () =>
      {
        setQuizzForm(true);
      }

      const handleCloseQuizzForm = () =>
      {
        setQuizzForm(false);
      }

      const handleQuizzAdded = (newQuizz) =>
      {
        setQuizess((prev) =>[...prev, newQuizz])
      }

      

 return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-buttons">
          <button className="btn btn-blue" onClick={openQuizzForm}>Add Quizz</button>
          <button className="btn btn-green" onClick={handleAddQuestionClick}>Add Question</button>
          <button className="btn btn-green" onClick={openThemeForm}>Add Theme</button>
            {showAddQuestionForm && (
                <AddQuestionForm 
                    themes={themes}
                    onClose = {handleCloseQuestionForm}
                    onQuestionCreated={handleQuestionCreated}
                />
                )}
            {themeForm && (
              <AddThemeForm
                onThemeAdded={handleThemeAdded}
                onClose = {handleCloseThemeForm}/>
            )}
            {quizzForm && (
              <AddQuizForm 
                onQuizAdded={handleQuizzAdded}
                onClose={handleCloseQuizzForm}/>
            )}
        </div>
      </div>

      <div className="quiz-grid">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.Id} className="quiz-card" onClick={() => handleOpenQuiz(quiz)}>
              <h2>{quiz.Title}</h2>
            <p>
             Difficulty: <span className={`difficulty ${difficultyMap[quiz.Difficulty]?.toLowerCase() || ""}`}>
             {difficultyMap[quiz.Difficulty] || "Unknown"}
              </span>
            </p>
              <p>Time Limit: {quiz.TimeLimit} sec</p>
              <p>Max Score: {quiz.MaxScore}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">Nema dostupnih kvizova.</p>
        )}
      </div>
    </div>
  );

}
    export default AdminMainPage;