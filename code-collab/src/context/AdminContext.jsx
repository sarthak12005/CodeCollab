import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize admin state from localStorage
  useEffect(() => {
    const initializeAdmin = async () => {
      try {
        const storedAdmin = localStorage.getItem('adminUser');
        const storedIsAdmin = localStorage.getItem('isAdmin');
        
        if (storedAdmin && storedIsAdmin === 'true') {
          const adminData = JSON.parse(storedAdmin);
          setAdminUser(adminData);
          setIsAdmin(true);
          console.log('Admin restored from localStorage:', adminData);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Error loading admin state:', err);
        setError(err.message);
        setIsAdmin(false);
      } finally {
        // Mark loading as complete
        setIsLoading(false);
      }
    };

    initializeAdmin();
  }, []);

  const setAdminData = useCallback((admin) => {
    console.log('Setting admin data:', admin);
    setAdminUser(admin);
    setIsAdmin(true);
    localStorage.setItem('adminUser', JSON.stringify(admin));
    localStorage.setItem('isAdmin', 'true');
    console.log('Admin data saved to localStorage');
  }, []);

  const clearAdminData = useCallback(() => {
    console.log('Clearing admin data');
    setAdminUser(null);
    setIsAdmin(false);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdmin');
  }, []);

  const value = {
    adminUser,
    isAdmin,
    isLoading,
    error,
    setAdminData,
    clearAdminData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
