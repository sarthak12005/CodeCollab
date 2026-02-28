import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Login from "./pages/login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfileNew from "./pages/ProfileNew";
import AdminPanel from "./pages/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage";
// import CodeCollaborationHub from "./pages/CodeCollaborationHub";
import About from "./pages/About";
import SingleProblemPage from "./pages/SingleProblemPage";
import SubmissionResults from "./pages/SubmissionResults";
import Preparation from "./pages/Preparation";
import Interview from "./pages/preparation/Interview";
import Aptitude from "./pages/preparation/Aptitude";
import Coding from "./pages/preparation/Coding";
import { Toaster } from "react-hot-toast";

// Admin Panel Imports
import { AdminProvider } from "./context/AdminContext";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProblems from "./pages/Admin/AdminProblems";
import AdminPreparation from "./pages/Admin/AdminPreparation";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AdminProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/singleProblem/:problemId" element={<SingleProblemPage />} />
          <Route path="/problems/:problemId/submissions" element={<SubmissionResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/preparation/interview" element={<Interview />} />
          <Route path="/preparation/aptitude" element={<Aptitude />} />
          <Route path="/preparation/coding" element={<Coding />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/problems"
            element={
              <ProtectedAdminRoute>
                <AdminProblems />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/preparation"
            element={
              <ProtectedAdminRoute>
                <AdminPreparation />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </AdminProvider>
  );
}

export default App;
