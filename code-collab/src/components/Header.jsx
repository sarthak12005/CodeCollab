import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userImage, setUserImage] = useState(user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" );


  return (
    <>
      <header className="bg-[#0a0a12]  sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 md:h-17">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] cursor-pointer"
                onClick={() => navigate("/")}
              >
                CODE COLLAB
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div
                className="text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200 font-medium cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </div>
              <div
                className="text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200 font-medium cursor-pointer"
                onClick={() => navigate("/problems")}
              >
                Problems
              </div>
              <div className="text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200 font-medium cursor-pointer">
                Preparations
              </div>
              <div className="text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200 font-medium cursor-pointer"  onClick={() => navigate("/about")}>
                About
              </div>
              <div className="text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200 font-medium cursor-pointer">
                Blog
              </div>
            </nav>

            {/* Auth Buttons */}

            {user ? (
              <>
                <div
                  className="hidden md:flex items-center space-x-4"
                  onClick={() => navigate("/profile")}
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-white/80">
                    <img
                      src={userImage}
                      alt="user-profile"
                      className="w-full h-full rounded-full object-center object-cover"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <div
                    className="px-4 py-2 text-[#c4c4c4] hover:text-white transition-colors duration-200 font-medium cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                  <div
                    className="px-4 py-2 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] text-white rounded-md  transition-all duration-300 font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(110,68,255,0.5)]"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </div>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-[#e0e0e8] hover:text-[ #1cb8ff] focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (hidden by default) */}
        <div className="md:hidden bg-dark-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
            >
              Docs
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
            >
              Blog
            </a>
            <div className="pt-4 border-t border-dark-700">
              <a
                href="#"
                className="block px-3 py-2 text-[#e0e0e8] hover:text-[#1cb8ff] transition-colors duration-200"
              >
                Login
              </a>
              <a
                href="#"
                className="block px-3 py-2 mt-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-md hover:shadow-glow transition-all duration-300 box-shadow-[0 0 15px rgba(110, 68, 255, 0.5)] "
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
