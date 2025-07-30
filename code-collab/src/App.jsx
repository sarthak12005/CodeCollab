import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Login from "./pages/login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import CodeCollaborationHub from "./pages/CodeCollaborationHub";
import About from "./pages/About";
import SingleProblemPage from "./pages/SingleProblemPage";
import SubmissionResults from "./pages/SubmissionResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/singleProblem/:problemId" element={<SingleProblemPage />} />
      <Route path="/problems/:problemId/submissions" element={<SubmissionResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
