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
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
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
