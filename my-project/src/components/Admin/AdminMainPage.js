import {useState, useEffect, use} from "react";
import jwtDecode from "jwt-decode";
import "./AdminMainPage.css";  
import { getQuizzes } from "../../services/quizServices";
import AddQuestionForm from "./forms/AddQuestionForm";
function AdminMainPage() {
    const [quizzes, setQuizess] = useState([]);
    // forme za dodavanje su odvojene komponente, ovde ih
    // samo prikazujemo
    const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
    const [themes, setThemes] = useState([]);

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
          //  const data = 
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

    

 return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-buttons">
          <button className="btn btn-blue" onClick={() => alert("Dodaj novi kviz")}>Add Quizz</button>
          <button className="btn btn-green" onClick={handleAddQuestionClick}>Add Question</button>
            {showAddQuestionForm && (
                <AddQuestionForm 
                    themes={themes}
                    onClose = {handleCloseQuestionForm}
                    onQuestionCreated={handleQuestionCreated}
                />
                )}
        </div>
      </div>

      <div className="quiz-grid">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.Id} className="quiz-card" onClick={() => handleOpenQuiz(quiz)}>
              <h2>{quiz.Title}</h2>
              <p>Difficulty: <span className={`difficulty ${quiz.Difficulty.toLowerCase()}`}>{quiz.Difficulty}</span></p>
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