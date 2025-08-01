import { TypeAnimation } from "react-type-animation";
import { FaUsers } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
   const [isLogin, setIsLogin] = useState(false);
   const {user} = useAuth();
   const { theme } = useTheme();

  //  console.log(user)

   const Navigate = useNavigate();

   useEffect(() => {
      if (user) {
         setIsLogin(true)
      } else {
         setIsLogin(false)
      }
   },[])




  const handleButtonLogin = () => {
      if (user === null) {
          Navigate('/login');
      } else {
         Navigate('/problems')
      }
  }


  return (
    <section className={`py-10 h-[92.4vh] ${theme.gradient.secondary} border-b-1 border-white`}>
      <div className=" w-full h-[80%] ">
        <div className="flex flex-col gap-10 items-center h-full py-10">
          <div className="hero-text">
            <h1 className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent ${theme.gradient.primary} drop-shadow-[0_0_15px_rgba(110,68,255,0.5)]`}>
              CODE COLLAB
            </h1>
            <p className={`mt-4 text-lg font-bold ${theme.text.secondary} text-center max-w-2xl`}>
              Code Together In Real-Time
            </p>
          </div>

          <div className={`${theme.bg.tertiary} rounded-lg overflow-hidden border ${theme.border.primary} shadow-xl max-w-2xl mx-auto`}>
            {/* Terminal Header */}
            <div className={`flex items-center px-4 py-3 ${theme.bg.secondary} border-b ${theme.border.primary}`}>
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className={`text-sm ${theme.text.tertiary}`}>bash</div>
            </div>

            {/* Terminal Body */}
            <div className={`p-4 font-mono space-y-2 ${theme.text.primary}`}>
              {/* Live Demo Tag */}
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                <span className="text-green-400 text-sm">[Live Demo]</span>
              </div>

              {/* Command Line */}
              <div className="flex items-start w-[400px]">
                <span className="text-purple-400 mr-2">$</span>
                <TypeAnimation
                  sequence={[
                    "npm create colab-room",
                    1500,
                    "npm create colab-room\nConnecting 3 developers...",
                    2000,
                    "npm create colab-room\nConnecting 3 developers...\nSession ready: colab.io/room/2bx49",
                    3000,
                  ]}
                  wrapper="div"
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "1rem",
                    fontFamily: "monospace",
                  }}
                  cursor={true}
                  repeat={false}
                  className={`${theme.text.secondary}`}
                />
              </div>
            </div>
          </div>

          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff] cursor-pointer text-white rounded-md shadow-glow hover:shadow-[0_0_15px_rgba(110,68,255,0.5)] transition duration-300"
            onClick={handleButtonLogin}
          >
            Start Coding Now
          </button>

            <div className="hero-bottom flex p-2.5 ">
                  <div className={`px-2.5 text-1xl ${theme.text.primary} flex items-center gap-[5px]`}><FaUsers size={21} color="#1cb8ff"/> 10,847+ active users</div>
                  <div className={`px-2.5 text-1xl ${theme.text.primary} border-l-1 border-r-1 flex items-center gap-[5px]`}><FaShieldAlt size={21} color="#1cb8ff"/> End-to-end encrypted</div>
                  <div className={`px-2.5 text-1xl ${theme.text.primary} flex items-center gap-[5px]`}><BsFillLightningChargeFill size={21} color="#1cb8ff"/> Real-time collaboration</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
