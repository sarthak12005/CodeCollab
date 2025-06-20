import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const userContext = createContext();

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
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

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

        if (response.data) {
          setUser(response.data.user);
          console.log(response.data);
          setUserImage(response.data.user.userImage);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        if (!window.location.path === "/") {
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  

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
    <userContext.Provider value={{ user,userImage,updateUser, updateToken, logout }}>
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
