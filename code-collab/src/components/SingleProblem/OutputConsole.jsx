import React, { useState } from 'react';

const OutputConsole = ({ output }) => {
  const [activeTab, setActiveTab] = useState('Output');

  const tabs = ['Output', 'Test Cases', 'Debug'];

  return (
    <div className="h-full bg-slate-800 flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-700 bg-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400 bg-slate-700'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-slate-900">
        {activeTab === 'Output' && (
          <div className="h-full">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
              {output || 'Ready to run your code...'}
            </pre>
          </div>
        )}
        
        {activeTab === 'Test Cases' && (
          <div className="h-full">
            <div className="text-sm text-gray-400">
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">Test Case 1:</div>
                <div className="bg-slate-700 rounded p-3 mb-2">
                  <div className="text-blue-400">Input:</div>
                  <div className="font-mono text-sm">nums = [2,7,11,15], target = 9</div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-green-400">Expected Output:</div>
                  <div className="font-mono text-sm">[0,1]</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">Test Case 2:</div>
                <div className="bg-slate-700 rounded p-3 mb-2">
                  <div className="text-blue-400">Input:</div>
                  <div className="font-mono text-sm">nums = [3,2,4], target = 6</div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-green-400">Expected Output:</div>
                  <div className="font-mono text-sm">[1,2]</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Debug' && (
          <div className="h-full">
            <div className="text-sm text-gray-400">
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">Debug Information:</div>
                <div className="bg-slate-700 rounded p-3 space-y-2">
                  <div>• Code compilation: <span className="text-green-400">Success</span></div>
                  <div>• Memory usage: <span className="text-blue-400">12.5 MB</span></div>
                  <div>• Execution time: <span className="text-yellow-400">0.023s</span></div>
                  <div>• Test cases passed: <span className="text-green-400">2/2</span></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="font-semibold text-white mb-2">Stack Trace:</div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="font-mono text-xs text-gray-300">
                    No errors or warnings detected.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputConsole;