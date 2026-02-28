import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useAuth } from "../context/userContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, ChevronRight } from "lucide-react";
import useDeviceDetection from "../hooks/useDeviceDetection";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To track active link
  const { user } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const deviceInfo = useDeviceDetection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    if (!deviceInfo.isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [deviceInfo.isMobile, isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Problems", path: "/problems" },
    { name: "Preparation", path: "/preparation" },
    { name: "About", path: "/about" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`
    sticky top-0 w-full z-50
    transition-all duration-300
    ${theme.bg.header}
    border-b ${theme.border.primary}
    backdrop-blur-md
    ${isScrolled ? "shadow-xl bg-opacity-90" : "bg-opacity-100"}
  `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-17">

          {/* Logo with Glow Effect */}
          <div className="flex-shrink-0">
            <h1
              onClick={() => handleNavigation("/")}
              className="text-2xl font-black tracking-tighter cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] hover:opacity-80 transition-opacity"
            >
              CODE COLLAB
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full cursor-pointer
                    ${isActive ? theme.text.accent : theme.text.secondary}
                    hover:${theme.text.accent} group`}
                >
                  {item.name}
                  {/* Active Indicator Dot/Line */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#6e44ff] rounded-full shadow-[0_0_8px_#6e44ff]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
    flex items-center justify-center 
    w-8 h-8 rounded-lg border 
    ${theme.border.primary} 
    ${theme.bg.tertiary} 
    hover:scale-105 active:scale-95 
    transition-all duration-200 
    shadow-sm
  `}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun size={16} className="text-yellow-400 fill-yellow-400/20" />
              ) : (
                <Moon size={16} className="text-indigo-400 fill-indigo-400/10" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center border-l pl-4 ml-2 border-gray-700/20">
              {user ? (
                <div
                  className="flex items-center space-x-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-500/10 transition-colors"
                  onClick={() => handleNavigation("/profile")}
                >
                  <img
                    src={user.userImage || "https://res.cloudinary.com/dmhm7q4ow/image/upload/v1772309687/ChatGPT_Image_Mar_1_2026_01_47_34_AM_unuhue.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full border-2 border-[#6e44ff] object-cover"
                  />
                  <span className={`text-sm font-bold ${theme.text.primary} hidden xl:block`}>
                    {user?.username}
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className={`px-5 py-2 text-sm font-bold ${theme.text.secondary} hover:opacity-70`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Slide-in Animation */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] z-[60] transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${theme.bg.secondary}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-lg opacity-50">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
          </div>

          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center justify-between w-full p-4 rounded-xl text-left font-semibold ${location.pathname === item.path ? "bg-[#6e44ff]/10 text-[#6e44ff]" : theme.text.secondary
                  }`}
              >
                {item.name}
                <ChevronRight size={16} />
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-700/20">
            {!user && (
              <button
                onClick={() => handleNavigation("/signup")}
                className="w-full py-4 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] text-white rounded-2xl font-bold"
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;