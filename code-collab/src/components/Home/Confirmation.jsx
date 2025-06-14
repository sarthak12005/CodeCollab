import React, { useState, useEffect } from "react";
import { IoPlay } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {

  const navigate = useNavigate();
  return (
    <section className="bg-[#0a0a12] text-white py-20 px-4 flex flex-col items-center justify-center gap-2.5 border-b border-white">
      <div className="header-text flex justify-center items-center gap-2">
        <h1 className="text-[64px] text-white font-bold">Ready To</h1>
        <h1 className="text-[64px] bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] font-bold">
          Code Together
        </h1>
        <h1 className="text-[64px] text-white font-bold">?</h1>
      </div>
      <div className="header-text flex flex-col justify-center items-center gap-2">
        <h1 className="text-[22px] text-white font-bold">
          Join thousands of developers who are building the future, together.
        </h1>
        <h1 className="text-[22px] text-white font-bold">
          Start coding in real-time today.
        </h1>
      </div>
      <div className="middle-btn flex justify-center items-center gap-7 mt-8">
        <button className="bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] flex gap-2 justify-center items-center text-white px-4 py-4 rounded-md text-sm font-medium hover:bg-[#6e44ff]/90 transition" onClick={() => navigate('/login')}>
          <IoPlay />
          Getting Started For Free
        </button>
        <button className="text-gray-300 flex gap-2 justify-center items-center px-4 py-4 rounded-md text-sm font-medium border border-[#6e44ff] hover:bg-[#6e44ff]/10 transition">
          <FaShareAlt />
          Watch Demo
        </button>
      </div>
      <div className="header-text flex flex-col justify-center items-center gap-2 mt-8">
        <h1 className="text-[18px] text-gray-500 font-mono">
          Join thousands of developers who are building the future, together.
        </h1>
      </div>
    </section>
  );
};

export default Confirmation;
