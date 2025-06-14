import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const navigate = useNavigate();

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const fetchUser = async () => {
                const res = await axios.get(`${API_URL}/getUser`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });

                console.log("the user is ", res.data.user);
                setUser(res.data.user);

            }
        } catch (err) {
            console.error("Error in fetching user is : ", err);
            setUser(null);
        }


        fetchUser();

    }, [navigate]);


    /* 

        useEffect(() => {
             const token = localStorage.getItem('token');
            
              if (!token) {
                setUser(null);
                }

                try {
                  const res = await fetch('https://api.example.com/user', {
                    headers; {
                     Authorization: `Bearer ${token}`
                    }
                  });
                     }})
                }
        })
    
    */

    const updateUser = (newUser, token) => {
        setUser(newUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <userContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};
