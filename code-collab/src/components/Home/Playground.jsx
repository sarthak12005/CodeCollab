import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Playground = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme.bg.secondary}`}>
      <div className="flex flex-col gap-8 w-full min-h-[700px] justify-center items-center">
        {/* Header */}
        <div className="header-text flex justify-center gap-1 items-center">
          <h1 className={`text-[30px] ${theme.text.primary} font-bold`}>Try It </h1>
          <h1 className={`text-[30px] font-bold bg-clip-text text-transparent ${theme.gradient.primary}`}>
            Live
          </h1>
        </div>

        {/* Description */}
        <p className={`${theme.text.secondary} text-center max-w-xl`}>
          Experience real-time collaboration with our interactive playground.
          Type, share, and execute code together.
        </p>

        {/* Playground Container */}
        <div className="w-full max-w-3xl bg-[#1a1a2e] rounded-xl border border-[#6e44ff] overflow-hidden shadow-[0_0_15px_rgba(110,68,255,0.5)]">
          {/* File Tab */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-white/65 font-medium text-sm w-3 h-3 flex items-center">
                playground.js
              </span>
            </div>
            <div className="people-connect flex items-center justify-center gap-2.5">
              <span className="text-[#1cb8ff]">
                <FaUsers size={15} />
              </span>
              <span className="text-[#1cb8ff] font-bold text-[10px]">
                3 People editing
              </span>
            </div>
          </div>

          {/* Code Editor */}
          <div className="p-4 h-[150px] ">
            <div className="font-mono text-sm text-green-400 leading-6">
              <div className="flex">
                <span className="text-gray-500 mr-4 select-none">1</span>
                <span>
                  <span className="text-pink-400">// Try It Live</span>{" "}
                  {/* <span className="text-blue-300">app</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-yellow-300">createCollab</span>
                  <span className="text-white">&#40;&#41;;</span> */}
                </span>
              </div>
              <div className="flex mt-0.5">
                <span className="text-gray-500 mr-4 select-none">2</span>
                <span>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-green-400">greet</span>
                  <span className="text-white">&#40;</span>
                  <span className="text-orange-300"></span>
                  <span className="text-white">&#41; &#123;</span>
                </span>
              </div>
              <div className="flex mt-0.5">
                <span className="text-gray-500 mr-4 select-none">3</span>
                <span className="ml-4">
                  <span className="text-blue-300">console</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">log</span>
                  <span className="text-white">&#40;</span>
                  <span className="text-green-300">
                    &#39;Hello, collaborator!&#39;
                  </span>
                  <span className="text-white">&#41;;</span>
                </span>
              </div>
              <div className="flex mt-0.5">
                <span className="text-gray-500 mr-4 select-none">4</span>
                <span>
                  <span className="text-white">&#125;</span>
                </span>
              </div>
              <div className="flex mt-0.5">
                <span className="text-gray-500 mr-4 select-none">5</span>
                <span>
                  <span className="text-green-400">greet</span>
                  <span className="text-white">&#40;</span>
                  <span className="text-white">&#41;</span>
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-[#18181f] border-[0.5px] border-black px-4 py-2 flex gap-3">
            <button className="bg-[#6e44ff] flex gap-2 justify-center items-center text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#6e44ff]/90 transition">
              <IoPlay />
              Run Code
            </button>
            <button className="text-gray-300 flex gap-2 justify-center items-center px-4 py-2 rounded-md text-sm font-medium border border-[#6e44ff] hover:bg-[#6e44ff]/10 transition">
              <FaShareAlt />
              Share
            </button>
          </div>

          {/* Console Output */}
          <div className="bg-black/80 p-4 flex flex-col gap-1.5">
            <div className="consolename font-mono text-white">
              &#62;_console
            </div>
            <div className="text-green-400 font-mono font-bold text-sm">
              Hello, collaborator!
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-6 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] text-white px-8 py-3 rounded-[8px] font-bold hover:opacity-90 transition">
          Create Your Own Playground
        </button>
      </div>
    </section>
  );
};

export default Playground;
