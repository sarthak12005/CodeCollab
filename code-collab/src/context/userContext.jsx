import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../config/FirebaseConfig";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const userContext = createContext();

// Export the context for direct use
export const UserContext = userContext;

// const userdata = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     id: "12345",
//     profilePicture: "https://example.com/profile.jpg",
//     bio: "A passionate coder and tech enthusiast.",
//     skills: ["JavaScript", "React", "Node.js"],
// }

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();


  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;

      const response = await axios.post(`${API_URL}/addUser`, {
        username: userData.displayName,
        email: userData.email,
        password: userData.uid, // ✅ Fixed the typo here
        userImage: userData.photoURL,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // ✅ also fixed `res` → `response`
        navigate("/");
      }

    } catch (err) {
      console.error("Error logging in with Google:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        // popup closed by user
      } else {
        alert("Failed to login with Google. Please try again.");
      }
    }
  };


  const loginWithgithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const userData = result.user;


      const response = await axios.post(`${API_URL}/addUser`, {
        username: userData.displayName,
        email: userData.email,
        password: userData.uid,
        userImage: userData.photoURL,
      });

      if (response.data.token) {

        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      console.error("the error in login user", err);
    }
  }



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        if (error.response.message === "Internal server in verifying jwt token") {
        }
        console.error("Error fetching user:", error);
        setUser(null);
        // Remove invalid token
        localStorage.removeItem("token");
        // Fix the condition - should check if NOT on login/signup pages
        if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, []);



  const updateUser = (newUser, token) => {
    setUser(newUser);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const updateToken = (token) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <userContext.Provider value={{ user, updateUser, updateToken, logout, loginWithGoogle, loginWithgithub }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
