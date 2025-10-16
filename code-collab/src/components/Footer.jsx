import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme.bg.secondary} border-b flex flex-col justify-between itmes-center gap-8 px-4`}>
      <div className={`h-60 grid md:grid-cols-4 grid-cols-1 hover:${theme.text.primary.replace('text-', '')} items-center px-10`}>
        <div className="lists flex flex-col gap-4 items-start justify-start w-62">
          <h1 className={`text-2xl font-bold text-transparent ${theme.gradient.primary} bg-clip-text`}>
            CODE COLLAB
          </h1>
          <h1 className={`${theme.text.primary} text-2xl w-full`}>
            Build the future of code collaboration with us.
          </h1>
          <div className={`icons flex gap-5 items-center justify-center ${theme.text.secondary}`}>
            <FaLinkedin className={`hover:${theme.text.primary.replace('text-', '')}`} />
            <FaGithub className={`hover:${theme.text.primary.replace('text-', '')}`} />
            <FaTwitter className={`hover:${theme.text.primary.replace('text-', '')}`} />
          </div>
        </div>
        <div className="lists flex flex-col gap-3 items-start justify-start">
          <h1 className={`text-2xl font-bold ${theme.text.primary} text-start`}>Product</h1>
          <ul className={`${theme.text.secondary} flex flex-col items-start justify-start`}>
            <li className={`mb-1 hover:${theme.text.primary.replace('text-', '')} font-bold`}>Features</li>
            <li className={`mb-1 hover:${theme.text.primary.replace('text-', '')} font-bold`}>Pricing</li>
            <li className={`mb-1 hover:${theme.text.primary.replace('text-', '')} font-bold`}>Documentation</li>
            <li className={`mb-1 hover:${theme.text.primary.replace('text-', '')} font-bold`}>API Reference</li>
          </ul>
        </div>

        <div className="lists flex flex-col gap-3 items-start  justify-start">
          <h1 className={`text-2xl font-bold ${theme.text.primary} text-start` }>
            Resources
          </h1>
          <ul className="text-gray-600 flex flex-col items-start justify-start">
            <li className="mb-1 hover:text-white font-bold">Blog</li>
            <li className="mb-1 hover:text-white font-bold">Community</li>
            <li className="mb-1 hover:text-white font-bold">Support</li>
            <li className="mb-1 hover:text-white font-bold">Status</li>
          </ul>
        </div>

        <div className="lists flex flex-col gap-3 items-start  justify-start">
          <h1 className={`text-2xl font-bold ${theme.text.primary} text-start` }>
            Stay Updated
          </h1>
          <h1 className={`${theme.text.primary}`}>
            Subscribe to our newsletter for updates and features.
          </h1>
          <div className={`input-tag relative `}>
            <input
              type="email"
              name="email"
              id="email"
              className={`${theme.bg.secondary} py-2.5 px-10 rounded-[9px] border-1 border-purple-600 `}
            />
            <button className="bg-[#6e44ff] py-2 px-3 text-white text-2xl font-bold rounded-r-[9px] absolute right-0">
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="line h-[2px] bg-white mx-5 "></div>

      <div className="mx-5 text-white flex justify-between items-center">
        <h1 className="text-white font-bold">
          © 2024 CodeCollab. All rights reserved.
        </h1>
        <ul className="text-gray-600 flex  items-center justify-center gap-5">
          <li className="mb-1 hover:text-white font-bold">Terms</li>
          <li className="mb-1 hover:text-white font-bold">Privacy</li>
          <li className="mb-1 hover:text-white font-bold">Security</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
