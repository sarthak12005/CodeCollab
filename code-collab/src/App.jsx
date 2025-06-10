import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Login from './pages/login';
import Signup from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
