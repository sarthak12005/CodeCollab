import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin.js';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { adminUser, clearAdminData } = useAdmin();
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/problems', label: 'Problems', icon: BookOpen },
    { path: '/admin/preparation', label: 'Preparation', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearAdminData();
    window.location.href = '/login';
  };

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } ${theme.bg.secondary} ${theme.border.primary} border-r min-h-screen transition-all duration-300 fixed left-0 top-0 flex flex-col shadow-lg z-40`}
    >
      {/* Header */}
      <div className={`p-4 ${theme.border.primary} border-b flex items-center justify-between`}>
        {!isCollapsed && (
          <h1 className={`text-lg font-bold ${theme.text.primary}`}>Admin</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg transition-colors ${theme.bg.hover}`}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? (
            <Menu size={20} className={theme.text.primary} />
          ) : (
            <X size={20} className={theme.text.primary} />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? `bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] ${theme.text.primary} font-medium shadow-lg`
                  : `${theme.text.secondary} hover:${theme.bg.hover}`
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className={`p-4 ${theme.border.primary} border-t`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${theme.text.error} hover:bg-red-500 hover:bg-opacity-10 font-medium`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
           