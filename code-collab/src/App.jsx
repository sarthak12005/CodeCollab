import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <>
        <Router>
           <Routes>
               <Route path='/' element={<Home/>}>Home</Route>
           </Routes>
        </Router>
    </>
  )
}

export default App
