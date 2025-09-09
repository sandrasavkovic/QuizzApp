import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Test from './components/Test/Test';
import Register from './components/Register/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
