import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Login from "./pages/login";
import Signup from "./pages/SignUp";
import Profile from "./pages/ProfileNew";
import NotFoundPage from "./pages/NotFoundPage";
import CodeCollaborationHub from "./pages/CodeCollaborationHub";
import About from "./pages/About";
import SingleProblemPage from "./pages/SingleProblemPage";
import SubmissionResults from "./pages/SubmissionResults";
import Preparation from "./pages/Preparation";
import Interview from "./pages/preparation/Interview";
import Aptitude from "./pages/preparation/Aptitude";
import Coding from "./pages/preparation/Coding";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/singleProblem/:problemId" element={<SingleProblemPage />} />
      <Route path="/problems/:problemId/submissions" element={<SubmissionResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/preparation" element={<Preparation />} />
      <Route path="/preparation/interview" element={<Interview />} />
      <Route path="/preparation/aptitude" element={<Aptitude />} />
      <Route path="/preparation/coding" element={<Coding />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
    <Toaster position="top-right" reverseOrder={false}/>
    </div>
  );
}

export default App;
