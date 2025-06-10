import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Problems from './pages/Problems'
import Login from './pages/login'
import Signup from './pages/SignUp'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/problems' element={<Problems />}>Problems</Route>
          <Route path='/login' element={<Login />}>Login</Route>
          <Route path='/signup' element={<Signup />}>Sign Up</Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
