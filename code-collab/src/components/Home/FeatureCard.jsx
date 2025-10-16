import React from "react";
import { useTheme } from "../../context/ThemeContext";
import useDeviceDetection from "../../hooks/useDeviceDetection";

const FeatureCard = () => {
  const { theme } = useTheme();
  const deviceInfo = useDeviceDetection();

  return (
    <section className={`py-8 sm:py-12 lg:py-16 ${theme.bg.secondary} border-b-1 border-white mobile-padding`}>
      <div className="flex flex-col gap-6 sm:gap-8 w-full min-h-[400px] sm:min-h-[600px] lg:min-h-[700px] max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-center items-center py-6 sm:py-8 lg:py-10">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent ${theme.gradient.primary} text-center selectable-text`}>
            Seamless Collaboration
          </h1>
        </div>

        {/* Three Panels Container */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-6 px-2 sm:px-4">
          {/* Left Panel: Code Editor */}
          <div
            className={`w-full max-w-sm lg:max-w-none lg:w-96 h-80 sm:h-96 lg:h-96 rounded-lg border border-blue-500 ${theme.shadow.lg} hover:translate-y-[-5px] lg:hover:translate-y-[-10px] transition-all ${theme.bg.tertiary}`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-3 sm:p-4 border-b ${theme.border.primary}`}>
              <div className="flex space-x-1.5 sm:space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
              <span className={`${theme.text.secondary} font-medium text-xs sm:text-sm`}>
                script.js
              </span>
            </div>

            {/* Code Content */}
            <div className="p-3 sm:p-4 h-full overflow-hidden">
              <div className={`font-mono ${deviceInfo.isMobile ? 'text-xs' : 'text-sm'} text-green-400 leading-5 sm:leading-6`}>
                <div className="flex">
                  <span className="text-gray-500 mr-4 select-none">1</span>
                  <span>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">app</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-yellow-300">createCollab</span>
                    <span className="text-white">&#40;&#41;;</span>
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-gray-500 mr-4 select-none">2</span>
                  <span></span>
                </div>
                <div className="flex mt-2">
                  <span className="text-gray-500 mr-4 select-none">3</span>
                  <span>
                    <span className="text-purple-400">function</span>{" "}
                    <span className="text-blue-300">initEditor</span>
                    <span className="text-white">&#40;</span>
                    <span className="text-orange-300">config</span>
                    <span className="text-white">&#41; &#123;</span>
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-gray-500 mr-4 select-none">4</span>
                  <span className="ml-4">
                    <span className="text-blue-300">app</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-300">connect</span>
                    <span className="text-white">&#40;</span>
                    <span className="text-green-300">
                      &#39;ws://server&#39;
                    </span>
                    <span className="text-white">&#41;;</span>
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-gray-500 mr-4 select-none">5</span>
                  <span className="ml-4">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-blue-300">app</span>
                    <span className="text-white">;</span>
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-gray-500 mr-4 select-none">6</span>
                  <span>
                    <span className="text-white">&#125;</span>
                  </span>
                </div>
                <div className="flex mt-4">
                  <span className="text-blue-400">|</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Panel: Team Call */}
          <div
            className={`w-full max-w-sm lg:max-w-none lg:w-96 h-80 sm:h-96 lg:h-96 rounded-lg border border-blue-500 ${theme.shadow.lg} hover:translate-y-[-5px] lg:hover:translate-y-[-10px] transition-all ${theme.bg.tertiary}`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-3 sm:p-4 border-b ${theme.border.primary}`}>
              <h2 className={`${theme.text.primary} font-semibold text-base sm:text-lg`}>Team Call</h2>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-400 text-xs font-semibold">
                  LIVE
                </span>
              </div>
            </div>

            {/* Video Grid */}
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {/* Alex */}
                <div className="relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
                    alt="Alex"
                    className="w-full h-16 sm:h-20 object-cover object-center rounded"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/35 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Alex
                  </div>
                </div>

                {/* Maya */}
                <div className="relative">
                  <img
                    src="https://media.istockphoto.com/id/1488528447/photo/black-man-celebrating-his-beautiful-flawless-melanin-skin-in-a-studio.jpg?s=2048x2048&w=is&k=20&c=kjgQEwI5W5eqYeg6tzt81f57WpFIWcIwUl9YcpPIfDs="
                    alt="Maya"
                    className="w-full h-16 sm:h-20 object-cover object-center rounded"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/35 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Maya
                  </div>
                </div>

                {/* Carlos */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Carlos"
                    className="w-full h-16 sm:h-20 object-cover object-center rounded"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/35 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Carlos
                  </div>
                </div>

                {/* Add Button */}
                <div className={`flex items-center justify-center ${theme.bg.primary} rounded h-16 sm:h-20 hover:${theme.bg.hover} cursor-pointer transition-colors`}>
                  <span className={`${theme.text.primary} text-xl sm:text-2xl font-light`}>+</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </button>

                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Console Output */}
          <div
            className={`w-full max-w-sm lg:max-w-none lg:w-96 h-80 sm:h-96 lg:h-96 rounded-lg border border-blue-500 ${theme.shadow.lg} overflow-hidden hover:translate-y-[-5px] lg:hover:translate-y-[-10px] transition-all ${theme.bg.tertiary}`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-3 sm:p-4 border-b ${theme.border.primary}`}>
              <span className={`${theme.text.accent} font-medium text-xs sm:text-sm`}>
                Console Output
              </span>
            </div>

            {/* Console Content */}
            <div
              className={`p-3 sm:p-4 h-full overflow-y-auto font-mono ${deviceInfo.isMobile ? 'text-xs' : 'text-xs'} leading-4 sm:leading-5 ${theme.bg.primary}`}
            >
              <div className={`${theme.text.tertiary}`}>$ node app.js</div>
              <div className="text-green-400">
                [SUCCESS] Server running on port 3000
              </div>
              <div className={`${theme.text.secondary}`}>
                [INFO] Initializing CodeCollab v2.5.0...
              </div>
              <div className={`${theme.text.secondary}`}>
                [INFO] Loading extensions: [3/3]
              </div>
              <div className="text-green-400">
                [SUCCESS] All extensions loaded
              </div>
              <div className={`${theme.text.secondary}`}>
                [INFO] Session [J28xX9] created
              </div>
              <div className={`${theme.text.secondary}`}>[INFO] User Alex connected</div>
              <div className={`${theme.text.secondary}`}>[INFO] User Maya connected</div>
              <div className={`${theme.text.secondary}`}>[INFO] User Carlos connected</div>
              <div className="text-red-400">
                [ERROR] Failed to fetch user data
              </div>
              <div className={`${theme.text.secondary}`}>[INFO] Reconnecting...</div>
              <div className={`${theme.text.secondary}`}>
                [LOG] Successfully reconnected
              </div>
              <div className="text-green-400">
                [SUCCESS] All tests passed (15/15)
              </div>
              <div className="text-green-400">
                [LOG] Ready for collaboration!
              </div>
              <div className={`${theme.text.accent} mt-2`}>|</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
