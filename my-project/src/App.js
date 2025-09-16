import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Test from './components/Test/Test';
import AdminMainPage from './components/Admin/AdminMainPage';
import Register from './components/Register/Register';
import StartQuizPage from './components/Quizz/StartQuiz';
import ResultInfo from './components/Quizz/ResultInfo';
import UserResults from './components/UserResults/UserResults';
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

      </Routes>
    </div>
  );
}

export default App;
