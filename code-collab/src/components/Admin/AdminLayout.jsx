import React from "react";
import AdminSidebar from "./AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
import { useAdmin } from "../../hooks/useAdmin.js";

const AdminLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen ${theme.bg.primary}`}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="p-8">{children}</div>
      </main>

      {/* Mobile Responsive Adjustment */}
      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
