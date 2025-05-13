import React from "react";

const FeatureCard = () => {
  return (
    <section className="py-15 bg-[#0a0a12] ">
      <div className="boxes flex flex-col gap-7.5 w-screen h-[600px]">
        <div className="name flex justify-center items-center py-10">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff]">
            Seamless Collaboration
          </h1>
        </div>
        
          {/* <div className="box1 w-[400px] h-[420px] bg-[#1a1a2e] rounded-2xl border"></div>
            <div className="box1 w-[400px] h-[420px] bg-red-500 rounded-2xl"></div>
            <div className="box1 w-[400px] h-[420px] bg-red-500 rounded-2xl"></div> */}

          <div className=" text-white flex justify-center items-center h-screen gap-6">
            {/* Left Box: Code Editor */}
            <div className="w-[400px] h-[420px]  rounded-lg overflow-hidden border border-[#6e44ff] shadow-md">
              <div className=" p-4 font-mono text-sm text-green-400">
                <pre>
                  {`const app = createCollab();

function initEditor(config) {
  app.connect('ws://server');
  return app;
}`}
                </pre>
              </div>
            </div>

            {/* Middle Box: Team Call */}
            <div className="w-[400px] h-[420px]  rounded-lg overflow-hidden border border-[#6e44ff] shadow-md">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Team Call</h2>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* User Profile 1 */}
                  <div className="relative">
                    <img
                      src="https://source.unsplash.com/random/150x150/?man "
                      alt="Alex"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="absolute bottom-2 left-2 py-2 px-3.5  rounded-4xl bg-black bg-opacity-50 text-center text-xs">
                      Alex
                    </div>
                  </div>

                  {/* User Profile 2 */}
                  <div className="relative">
                    <img
                      src="https://source.unsplash.com/random/150x150/?woman "
                      alt="Maya"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="absolute bottom-2 left-2 py-2 px-3.5 rounded-4xl bg-black bg-opacity-50 text-center text-xs">
                      Maya
                    </div>
                  </div>

                  {/* User Profile 3 */}
                  <div className="relative">
                    <img
                      src="https://source.unsplash.com/random/150x150/?person "
                      alt="Carlos"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="absolute bottom-2 left-2 py-2 px-3.5 rounded-4xl bg-black bg-opacity-50 text-center text-xs">
                      Carlos
                    </div>
                  </div>

                  {/* Add User Button */}
                  <div className="flex items-center justify-center bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition">
                    <span className="text-2xl font-bold text-white">+</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-around mt-6">
                  <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Box: Console Output */}
            <div className="w-[400px] h-[420px]  rounded-lg overflow-auto border border-[#6e44ff] shadow-md">
              <div className="bg-gray-900 p-4 font-mono text-sm text-green-400 space-y-2">
                <div>[LOG] Connected to server</div>
                <div>[INFO] Syncing state...</div>
                <div>[DEBUG] Buffer size: 4KB</div>
                <div className="text-yellow-400">[WARN] Memory usage high</div>
                <div className="text-red-400">
                  [ERROR] Failed to fetch user data
                </div>
                <div>[INFO] Reconnecting...</div>
                <div>[LOG] Successfully reconnected</div>
                <div>[DEBUG] Latency: 23ms</div>
                <div>[LOG] All systems operational</div>
              </div>
            </div>
          </div>
        </div>
     
    </section>
  );
};

export default FeatureCard;
