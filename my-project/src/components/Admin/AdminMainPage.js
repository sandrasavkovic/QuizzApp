import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMainPage.css";  
import { getQuizzes } from "../../services/quizServices";
import AddQuestionForm from "./forms/QuestionForms/AddQuestionForm";
import { getThemes } from "../../services/themeService";
import AddThemeForm from "./forms/AddThemeForm";
import AddQuizForm from "./forms/AddQuizForm";
import { getUser } from "../../services/authServices";

function AdminMainPage() {
    const [quizzes, setQuizess] = useState([]);
    // forme za dodavanje su odvojene komponente, ovde ih
    // samo prikazujemo
   // const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
    const [themes, setThemes] = useState([]);
    const [themeForm, setThemeForm] = useState(false);
    const [quizzForm, setQuizzForm] = useState(false);
    const navigate = useNavigate();
    // za filtriranje
    const [themeFilter, setThemeFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [keywordFilter, setKeywordFilter] = useState("");
    const [user, setUser] = useState(null);
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // console.log("USER", user);
    const [showDropdown, setShowDropdown] = useState(false);

    const roleClaim = localStorage.getItem("roleClaim");

    useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem("userId"));
      setUser(userData);
      console.log(userData);
    } catch (err) {
      console.error(err);
    }
  };

  fetchUser();
}, []);


    const fetchQuizzes = async () => {
        try{
            const data = await getQuizzes();
            setQuizess(data);   
            console.log(data)
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

    const filteredQuizzes = quizzes.filter((quiz) => {
      const mathcesTheme = 
        themeFilter ==="" ||
        quiz.themes.some((t) =>
         t.name.toLowerCase().includes(themeFilter.toLowerCase())
      );
      const mathesDifficulty = 
        difficultyFilter === "" || quiz.difficulty === difficultyFilter;
      const matchesKeyword =
          keywordFilter === "" ||
          quiz.title.toLowerCase().includes(keywordFilter.toLowerCase()) ||
          quiz.description.toLowerCase().includes(keywordFilter.toLowerCase());
        
      return mathcesTheme && mathesDifficulty && matchesKeyword;
    });

 
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
        console.log("KVIZOVI", quizzes);
      }

      
      const handleStartQuizz = (quizId) =>
      {
         alert(quizId);
        navigate("/start-quiz", {state :  { quizId } })
      }

      const handleLogout = () =>
      {
      localStorage.removeItem("user");
      localStorage.removeItem("token");  
      localStorage.removeItem("userId");
        navigate("/login");
      }
 return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
       <div className="user-profile">
  <img
    src={user?.image || "/default-user.png"}
    alt={user?.username || "User"}
    className="user-image"
    onClick={() => setShowDropdown(prev => !prev)}
  />
  {showDropdown && (
    <div className="user-dropdown">
      <button className="btn btn-blue" onClick={() => navigate("/my-results")}>
        My Results
      </button>
      <button className="btn btn-red" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</div>

        {roleClaim === "admin" && (
        <div className="admin-buttons">
          <button className="btn btn-blue" onClick={openQuizzForm}>Add Quizz</button>
          {/* <button className="btn btn-green" onClick={handleAddQuestionClick}>Add Question</button> */}
          <button className="btn btn-green" onClick={openThemeForm}>Add Theme</button>
{/*            
            {showAddQuestionForm && (
                <AddQuestionForm 
                    themes={themes}
                    onClose = {handleCloseQuestionForm}
                    onQuestionCreated={handleQuestionCreated}
                />
                )} */}
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
         )} </div>
{/* 
        filter */}
        
      {/* Filter UI */}
      <div className="filters flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by theme..."
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
          className="border rounded p-2"
        />
         <input
          type="text"
          placeholder="Search by keyword..."
          value={keywordFilter}
          onChange={(e) => setKeywordFilter(e.target.value)}
          className="border rounded p-2"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

      </div>

         <div className="quiz-grid">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-card"
              // onClick={() => handleOpenQuiz(quiz)}
            >
          <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
       <p>Questions: {quiz.questionCount}</p>
        <p>
          Difficulty: <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
            {quiz.difficulty}
          </span>
        </p>
        <p>Time Limit: {quiz.timeLimit} sec</p>
        <p>
          Themes:{" "}
          {quiz.themes && quiz.themes.length > 0
            ? quiz.themes.map((t) => t.name).join(", ")
            : "No themes"}
        </p>
        <button className="btn btn-blue" onClick={() => handleStartQuizz(quiz.id)}>Start quizz</button>
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