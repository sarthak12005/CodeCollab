import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Login from './pages/login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import CodeCollaborationHub from './pages/CodeCollaborationHub';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile />}/>
      <Route path='/*' element={<NotFoundPage/>}/>
      <Route path='/code-profile' element= {<CodeCollaborationHub />} />
    </Routes>
  );
}

export default App;
