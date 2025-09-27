import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Test from './components/Test/Test';
import AdminMainPage from './components/Admin/AdminMainPage';
import Register from './components/Register/Register';
import StartQuizPage from './components/Quizz/StartQuiz';
import ResultInfo from './components/Quizz/ResultInfo';
import UserResults from './components/UserResults/UserResults';
import AdminThemesPage from './components/Admin/Themes/AdminThemes';
import AdminQuestionsPage from './components/Admin/Questions/AdminQuestions';
import { ToastContainer, toast } from 'react-toastify';
import LeaderboardPage from './components/Quizz/Global list/LeaderboardPage';
import GlobalboardPage from './components/Quizz/Global list/GlobalboardPage';
import AllUsersResults from './components/Quizz/Global list/AllUsersResults';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token je istekao
        toast.warning("Your session expired");
        localStorage.clear();         
        window.location.href = "/";    
      } else {
        const timeLeft = (decoded.exp - now) * 1000; // milisekunde
        const timer = setTimeout(() => {
          toast.warning("Your session expired");
          localStorage.clear();
          window.location.href = "/";
        }, timeLeft);

        return () => clearTimeout(timer); 
      }

    } catch (err) {
      // Ako token nije validan
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={<AdminMainPage />} />
        <Route path='/start-quiz' element={<StartQuizPage/>}/>
        <Route path="/quiz-result/:id" element={<ResultInfo />} />
        <Route path="/my-results" element={<UserResults/>}/>
        <Route path="/admin/themes" element={<AdminThemesPage />} />
        <Route path="/admin/questions" element={<AdminQuestionsPage />} /> 
        <Route path="/leaderboard/:quizzId" element={<LeaderboardPage />} />
        <Route path="/globalboard" element={<GlobalboardPage />} />
        <Route path="/users-results" element={<AllUsersResults/>} />


      </Routes>
        <ToastContainer
        position="top-center" // ovo centrira toaste na vrhu
        autoClose={3000}      // trajanje u ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
