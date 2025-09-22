import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMainPage.css"; 
import EditQuizForm from "./forms/QuizzForms/EditQuizForm"; 
import { getQuizzes, deleteQuizz, getQuizById } from "../../services/quizServices";
import { getThemes } from "../../services/themeService";
import AddQuizForm from "./forms/QuizzForms/AddQuizForm";
import { getUser } from "../../services/authServices";
import { toast } from "react-toastify";
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
    const [showDropdown, setShowDropdown] = useState(false);
    const [editingQuiz, setEditingQuizz] = useState(null);
   

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

     
      const openEditQuizForm = async (quizId) => {
        try {
        const data = await getQuizById(quizId); // backend endpoint koji vraća QuizzDto sa listom pitanja
         setEditingQuizz(data);
      } catch (err) {
         console.error(err);
  }     
    };


     const closeEditQuizForm = () => setEditingQuizz(null);

    const handleQuizUpdated = (updatedQuiz) => {
        setQuizess(prev => prev.map(q => q.id === updatedQuiz.id ? updatedQuiz : q));
        closeEditQuizForm();
  };

const handleDeleteQuiz = async (quizId) => {
  if (!window.confirm("Are you sure you want to delete this quiz?")) return;
  try {
    const result = await deleteQuizz(quizId);
    if(result.success) {
      setQuizess(prev => prev.filter(q => q.id !== quizId));
      toast.success("Quiz deleted successfully!");
    } else {
      toast.error("This quiz cannot be deleted because it was alredy attempted to solve!");
    }
  } catch(err) {
    console.error(err);
    toast.error("Failed to delete quiz!");
  }
};


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
          {quizzForm && (
              <AddQuizForm 
                onQuizAdded={handleQuizzAdded}
                onClose={handleCloseQuizzForm}/>
            )}
            {editingQuiz && (
         <EditQuizForm
            quiz={editingQuiz}
            
            onClose={closeEditQuizForm}
          onQuizUpdated={handleQuizUpdated}
         />
        )}

          {/* <button className="btn btn-blue" onClick={openQuizzForm}>Add Quizz</button>
          <button className="btn btn-green" onClick={openThemeForm}>Add Theme</button>

            {themeForm && (
              <AddThemeForm
                onThemeAdded={handleThemeAdded}
                onClose = {handleCloseThemeForm}/>
            )}
            {quizzForm && (
              <AddQuizForm 
                onQuizAdded={handleQuizzAdded}
                onClose={handleCloseQuizzForm}/>
            )} */}
              <button className="btn btn-blue" onClick={() => navigate("/admin/themes")}>Themes</button>
              <button className="btn btn-green" onClick={() => navigate("/admin/questions")}>Questions</button>
              <button className="btn btn-purple" onClick={() => navigate("/globalboard")} > Global board</button>
        </div>
         )}
   </div>


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
          <div className="quiz-card-buttons">
        <button className="btn btn-blue" onClick={() => handleStartQuizz(quiz.id)}>Start quizz</button>
        <button className="btn btn-yellow" onClick={() => openEditQuizForm(quiz.id)}>Edit</button>
        <button className="btn btn-red" onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
        <button className="btn btn-purple" onClick={() => navigate(`/leaderboard/${quiz.id}`)}>Leader Rank </button>
        

        </div>
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