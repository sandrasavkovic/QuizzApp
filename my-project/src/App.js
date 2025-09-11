import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Test from './components/Test/Test';
import AdminMainPage from './components/Admin/AdminMainPage';
import Register from './components/Register/Register';
import StartQuizPage from './components/StartQuiz/StartQuiz';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminMainPage />} />
        <Route path='/start-quiz' element={<StartQuizPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
