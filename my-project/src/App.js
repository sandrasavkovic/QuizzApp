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
import { ToastContainer } from 'react-toastify';
import LeaderboardPage from './components/Quizz/Global list/LeaderboardPage';
import GlobalboardPage from './components/Quizz/Global list/GlobalboardPage';
import AllUsersResults from './components/Quizz/Global list/AllUsersResults';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProtectedRoute from './protectedRoutes/ProtectedRoutes';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={
          <ProtectedRoute>
            <AdminMainPage />
            </ProtectedRoute>} />
        <Route path='/start-quiz' element={
          <ProtectedRoute>
            <StartQuizPage/>
            </ProtectedRoute>}/>
        <Route path="/quiz-result/:id" element={
          <ProtectedRoute>
            <ResultInfo />
            </ProtectedRoute>} />
        <Route path="/my-results" element={
          <ProtectedRoute >
            <UserResults/>
            </ProtectedRoute>}/>
        <Route path="/admin/themes" element={
          <ProtectedRoute role="admin">
            <AdminThemesPage />
           </ProtectedRoute>} />
        <Route path="/admin/questions" element={<ProtectedRoute role="admin">
            <AdminQuestionsPage />
           </ProtectedRoute>} />
        <Route path="/leaderboard/:quizzId" element={
          <ProtectedRoute>
            <LeaderboardPage />
            </ProtectedRoute>} />
        <Route path="/globalboard" element={
          <ProtectedRoute>
            <GlobalboardPage />
            </ProtectedRoute>}/>
        <Route path="/users-results" element={<ProtectedRoute role="admin">
            <AllUsersResults />
           </ProtectedRoute>} />

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
