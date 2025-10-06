import { TypeAnimation } from "react-type-animation";
import { FaUsers } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";
import useDeviceDetection from "../../hooks/useDeviceDetection";

const Hero = () => {
   const [isLogin, setIsLogin] = useState(false);
   const {user} = useAuth();
   const { theme } = useTheme();
   const deviceInfo = useDeviceDetection();

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
    <section className={`py-6 sm:py-10 min-h-screen ${theme.gradient.secondary} border-b-1 border-white mobile-padding`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-6 sm:gap-10 items-center h-full py-6 sm:py-10 max-w-6xl mx-auto">
          <div className="hero-text text-center">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent ${theme.gradient.primary} drop-shadow-[0_0_15px_rgba(110,68,255,0.5)] selectable-text`}>
              CODE COLLAB
            </h1>
            <p className={`mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl font-bold ${theme.text.secondary} text-center max-w-2xl mx-auto px-4 selectable-text`}>
              Code Together In Real-Time
            </p>
          </div>

          <div className={`${theme.bg.tertiary} rounded-lg overflow-hidden border ${theme.border.primary} shadow-xl w-full max-w-2xl mx-auto`}>
            {/* Terminal Header */}
            <div className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 ${theme.bg.secondary} border-b ${theme.border.primary}`}>
              <div className="flex space-x-1.5 sm:space-x-2 mr-3 sm:mr-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <div className={`text-xs sm:text-sm ${theme.text.tertiary}`}>bash</div>
            </div>

            {/* Terminal Body */}
            <div className={`p-3 sm:p-4 font-mono space-y-2 ${theme.text.primary}`}>
              {/* Live Demo Tag */}
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                <span className="text-green-400 text-xs sm:text-sm">[Live Demo]</span>
              </div>

              {/* Command Line */}
              <div className="flex items-start w-full overflow-hidden">
                <span className="text-purple-400 mr-2 text-sm sm:text-base">$</span>
                <div className="flex-1 min-w-0">
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
                      fontSize: deviceInfo.isMobile ? "0.875rem" : "1rem",
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                    cursor={true}
                    repeat={false}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className={`mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-4 ${theme.button.primary} rounded-lg font-medium transition-all duration-300 text-sm sm:text-base hover-desktop`}
            onClick={handleButtonLogin}
          >
            Start Coding Now
          </button>

          <div className="hero-bottom flex flex-col sm:flex-row gap-4 sm:gap-0 p-2.5 w-full max-w-4xl">
            <div className={`px-2.5 text-sm sm:text-base ${theme.text.primary} flex items-center justify-center sm:justify-start gap-2 selectable-text`}>
              <FaUsers size={deviceInfo.isMobile ? 18 : 21} color="#1cb8ff"/>
              <span>10,847+ active users</span>
            </div>
            <div className={`px-2.5 text-sm sm:text-base ${theme.text.primary} sm:border-l-1 sm:border-r-1 ${theme.border.primary} flex items-center justify-center sm:justify-start gap-2 selectable-text`}>
              <FaShieldAlt size={deviceInfo.isMobile ? 18 : 21} color="#1cb8ff"/>
              <span>End-to-end encrypted</span>
            </div>
            <div className={`px-2.5 text-sm sm:text-base ${theme.text.primary} flex items-center justify-center sm:justify-start gap-2 selectable-text`}>
              <BsFillLightningChargeFill size={deviceInfo.isMobile ? 18 : 21} color="#1cb8ff"/>
              <span>Real-time collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
