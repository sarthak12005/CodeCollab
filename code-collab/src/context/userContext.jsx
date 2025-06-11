import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
            
        }

    }, [navigate]); // <== ADD navigate as dependency

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
