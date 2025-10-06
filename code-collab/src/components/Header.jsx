import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import useDeviceDetection from "../hooks/useDeviceDetection";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const deviceInfo = useDeviceDetection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!deviceInfo.isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [deviceInfo.isMobile, isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${theme.bg.header} sticky top-0 z-50 shadow-lg transition-colors duration-300 `}>
        <div className="container mx-auto mobile-padding sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] cursor-pointer selectable-text"
                onClick={() => handleNavigation("/")}
              >
                CODE COLLAB
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div
                className={`${theme.text.secondary} ${theme.text.accent.replace('text-', 'hover:text-')} transition-colors duration-200 font-medium cursor-pointer hover-desktop`}
                onClick={() => handleNavigation("/")}
              >
                Home
              </div>
              <div
                className={`${theme.text.secondary} ${theme.text.accent.replace('text-', 'hover:text-')} transition-colors duration-200 font-medium cursor-pointer hover-desktop`}
                onClick={() => handleNavigation("/problems")}
              >
                Problems
              </div>
              <div
                className={`${theme.text.secondary} ${theme.text.accent.replace('text-', 'hover:text-')} transition-colors duration-200 font-medium cursor-pointer hover-desktop`}
                onClick={() => handleNavigation("/preparation")}
              >
                Preparation
              </div>
              <div
                className={`${theme.text.secondary} ${theme.text.accent.replace('text-', 'hover:text-')} transition-colors duration-200 font-medium cursor-pointer hover-desktop`}
                onClick={() => handleNavigation("/about")}
              >
                About
              </div>

              {/* Theme Toggle - Desktop */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme.bg.tertiary} ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200 hover-desktop`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div
                  className="flex items-center space-x-3 cursor-pointer hover-desktop"
                  onClick={() => handleNavigation("/profile")}
                >
                  <div className="w-8 h-8 rounded-full bg-white/80 overflow-hidden">
                    <img
                      src={user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt="user-profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`${theme.text.secondary} font-medium hidden xl:block`}>
                    {user?.name || 'Profile'}
                  </span>
                </div>
              ) : (
                <>
                  <button
                    className={`px-4 py-2 ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-colors duration-200 font-medium hover-desktop`}
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </button>
                  <button
                    className={`px-4 py-2 ${theme.button.primary} rounded-lg font-medium transition-all duration-300 hover-desktop`}
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme.bg.tertiary} ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg ${theme.text.secondary} hover:${theme.text.accent.replace('text-', '')} transition-colors duration-200 focus:outline-none`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer lg:hidden ${isMobileMenuOpen ? 'open' : ''} ${theme.bg.secondary} mobile-menu-container`}>
          <div className="p-6 space-y-6 safe-area-top safe-area-bottom">
            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              <button
                onClick={() => handleNavigation("/")}
                className={`block w-full text-left px-4 py-3 rounded-lg ${theme.text.secondary} hover:${theme.bg.tertiary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200 font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/problems")}
                className={`block w-full text-left px-4 py-3 rounded-lg ${theme.text.secondary} hover:${theme.bg.tertiary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200 font-medium`}
              >
                Problems
              </button>
              <button
                onClick={() => handleNavigation("/preparation")}
                className={`block w-full text-left px-4 py-3 rounded-lg ${theme.text.secondary} hover:${theme.bg.tertiary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200 font-medium`}
              >
                Preparation
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className={`block w-full text-left px-4 py-3 rounded-lg ${theme.text.secondary} hover:${theme.bg.tertiary} hover:${theme.text.accent.replace('text-', '')} transition-all duration-200 font-medium`}
              >
                About
              </button>
            </nav>

            {/* Mobile Auth Section */}
            <div className={`pt-6 border-t ${theme.border.primary} space-y-4`}>
              {user ? (
                <div
                  onClick={() => handleNavigation("/profile")}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${theme.bg.tertiary} cursor-pointer`}
                >
                  <div className="w-10 h-10 rounded-full bg-white/80 overflow-hidden">
                    <img
                      src={user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt="user-profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className={`${theme.text.primary} font-medium`}>{user?.name || 'Profile'}</p>
                    <p className={`${theme.text.tertiary} text-sm`}>View Profile</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className={`w-full px-4 py-3 ${theme.button.secondary} rounded-lg font-medium transition-all duration-200`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className={`w-full px-4 py-3 ${theme.button.primary} rounded-lg font-medium transition-all duration-300`}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
