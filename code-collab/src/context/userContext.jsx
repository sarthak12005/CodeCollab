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
    const token = localStorage.getItem('token');

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
            return;
        }

    }, [navigate]); // <== ADD navigate as dependency

    // useEffect(() => {
    //     if (!token) {
    //         setUser(null);
    //         localStorage.removeItem('token');
    //         return;
    //     }

    //     const fetchUser = async () => {
    //           try {
    //                 const res = await axios.get(` ${API_URL}/getUser `, {
    //                     headers : {
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 });

    //                 console.log("the user is : ", res.data.user);
    //                 setUser(res.data.user);
    //           } catch (err) {
    //               console.error('the error in fetchin user is: ', err);
    //               setUser(null);
    //           }
    //     }

    //     fetchUser();



    // },[navigate])

    const updateUser = (newUser, token) => {
        setUser(newUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const updateToken = (token) => {
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <userContext.Provider value={{ user, updateUser,updateToken, logout }}>
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
