import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Problems from './pages/Problems'

function App() {
  return (
    <>
        <Router>
           <Routes>
               <Route path='/' element={<Home/>}>Home</Route>
               <Route path='/problems' element={<Problems />}>Problems</Route>
           </Routes>
        </Router>
    </>
  )
}

export default App
