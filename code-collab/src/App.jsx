import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Login from './pages/login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile />}/>
    </Routes>
  );
}

export default App;
