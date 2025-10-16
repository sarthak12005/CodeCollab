import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`py-10 md:py-16 ${theme.bg.secondary} border-b flex flex-col justify-between items-center gap-10 px-4`}
    >
      <div
        className={`grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 md:gap-6 items-start md:items-center w-full px-4 md:px-10`}
      >
        {/* CODE COLLAB */}
        <div className="lists flex flex-col gap-4 items-center md:items-start justify-start w-full text-center md:text-left">
          <h1
            className={`text-2xl font-bold text-transparent ${theme.gradient.primary} bg-clip-text`}
          >
            CODE COLLAB
          </h1>
          <h1 className={`${theme.text.primary} text-xl md:text-2xl`}>
            Build the future of code collaboration with us.
          </h1>
          <div
            className={`icons flex gap-5 items-center justify-center ${theme.text.secondary}`}
          >
            <FaLinkedin className={`hover:${theme.text.primary.replace("text-", "")}`} />
            <FaGithub className={`hover:${theme.text.primary.replace("text-", "")}`} />
            <FaTwitter className={`hover:${theme.text.primary.replace("text-", "")}`} />
          </div>
        </div>

        {/* Product */}
        <div className="lists flex flex-col gap-3 items-center md:items-start justify-start text-center md:text-left">
          <h1 className={`text-2xl font-bold ${theme.text.primary}`}>Product</h1>
          <ul className={`${theme.text.secondary} flex flex-col items-center md:items-start`}>
            <li className={`mb-1 hover:${theme.text.primary.replace("text-", "")} font-bold`}>
              Features
            </li>
            <li className={`mb-1 hover:${theme.text.primary.replace("text-", "")} font-bold`}>
              Pricing
            </li>
            <li className={`mb-1 hover:${theme.text.primary.replace("text-", "")} font-bold`}>
              Documentation
            </li>
            <li className={`mb-1 hover:${theme.text.primary.replace("text-", "")} font-bold`}>
              API Reference
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="lists flex flex-col gap-3 items-center md:items-start justify-start text-center md:text-left">
          <h1 className={`text-2xl font-bold ${theme.text.primary}`}>Resources</h1>
          <ul className="text-gray-400 flex flex-col items-center md:items-start">
            <li className="mb-1 hover:text-white font-bold">Blog</li>
            <li className="mb-1 hover:text-white font-bold">Community</li>
            <li className="mb-1 hover:text-white font-bold">Support</li>
            <li className="mb-1 hover:text-white font-bold">Status</li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="lists flex flex-col gap-3 items-center md:items-start justify-start text-center md:text-left w-full">
          <h1 className={`text-2xl font-bold ${theme.text.primary}`}>Stay Updated</h1>
          <h1 className={`${theme.text.primary} text-sm md:text-base`}>
            Subscribe to our newsletter for updates and features.
          </h1>
          <div className="input-tag relative w-full max-w-[300px] md:max-w-none">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full ${theme.bg.secondary} py-2.5 px-4 md:px-10 rounded-[9px] border border-purple-600 focus:outline-none`}
            />
            <button className="bg-[#6e44ff] py-2 px-3 text-white text-xl font-bold rounded-r-[9px] absolute right-0 top-0 h-full">
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="line h-[1px] bg-white opacity-40 w-full mt-6"></div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 px-4 text-center md:text-left">
        <h1 className="text-white font-bold text-sm md:text-base">
          © 2024 CodeCollab. All rights reserved.
        </h1>
        <ul className="text-gray-400 flex flex-wrap justify-center md:justify-end items-center gap-5">
          <li className="mb-1 hover:text-white font-bold">Terms</li>
          <li className="mb-1 hover:text-white font-bold">Privacy</li>
          <li className="mb-1 hover:text-white font-bold">Security</li>
        </ul>
      </div>
    </section>

  );
};

export default Footer;
