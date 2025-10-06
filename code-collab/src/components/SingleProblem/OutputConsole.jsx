import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Trash2, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const OutputConsole = ({ output, isRunning, onClearOutput }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Output');

  const tabs = ['Output', 'Test Cases', 'Debug'];

  // Parse output for better display
  const parseOutput = (output) => {
    if (!output) return { mainOutput: '', testResults: null };

    // Look for test case validation markers
    const testCaseIndex = output.indexOf('📋 Test Case Validation:');
    if (testCaseIndex === -1) {
      // No test case validation found, show all as main output
      return { mainOutput: output.trim(), testResults: null };
    }

    const mainOutput = output.substring(0, testCaseIndex).trim();
    const testSection = output.substring(testCaseIndex);

    const isPassed = testSection.includes('✅ Test Case PASSED');
    const isFailed = testSection.includes('❌ Test Case FAILED');

    return {
      mainOutput: mainOutput || 'Code executed successfully',
      testResults: {
        section: testSection,
        isPassed,
        isFailed
      }
    };
  };

  const { mainOutput, testResults } = parseOutput(output);

  // Auto-switch to Output tab when new output arrives
  useEffect(() => {
    if (output && output.trim() && !output.includes('Ready to run')) {
      setActiveTab('Output');
    }
  }, [output]);

  return (
    <div className={`h-full ${theme.bg.secondary} flex flex-col`}>
      {/* Console Header - Enhanced */}
      <div className={`${theme.bg.tertiary} px-4 py-3 border-b ${theme.border.primary} flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className={`text-sm font-semibold ${theme.text.primary}`}>Output Console</span>
          {isRunning && (
            <div className="flex items-center gap-2 ml-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs ${theme.text.secondary}`}>Running...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {output && (
            <button
              onClick={onClearOutput}
              className={`p-1.5 rounded hover:${theme.bg.primary} ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
              title="Clear output"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Tab Headers */}
      <div className="flex border-b border-slate-600 bg-slate-700 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors relative ${activeTab === tab
                ? 'border-blue-400 text-blue-300 bg-slate-600'
                : 'border-transparent text-gray-300 hover:text-gray-200 hover:bg-slate-600'
              }`}
          >
            {tab}
            {tab === 'Output' && output && output.trim() && !output.includes('Ready to run') && activeTab !== 'Output' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden bg-slate-900 min-h-0">
        <div className="h-full p-4 overflow-y-auto bg-slate-900">
          {activeTab === 'Output' && (
            <div className="h-full">
              {output ? (
                <div className="space-y-4">
                  {/* Main Output */}
                  {mainOutput && (
                    <div className="bg-slate-700 rounded-lg p-4 border border-slate-500 mb-4 shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-green-300 font-medium">Code Output</span>
                      </div>
                      <div className="bg-slate-800 rounded p-3 border border-slate-600 max-h-32 overflow-y-auto">
                        <pre className="font-mono text-sm text-gray-100 whitespace-pre-wrap leading-relaxed">
                          {mainOutput}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Test Case Results */}
                  {testResults && (
                    <div className={`rounded-lg p-4 border shadow-lg ${testResults.isPassed
                        ? 'bg-green-900/30 border-green-500/50'
                        : testResults.isFailed
                          ? 'bg-red-900/30 border-red-500/50'
                          : 'bg-slate-700 border-slate-500'
                      }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${testResults.isPassed
                            ? 'bg-green-400'
                            : testResults.isFailed
                              ? 'bg-red-400'
                              : 'bg-yellow-400'
                          }`}></div>
                        <span className={`text-sm font-medium ${testResults.isPassed
                            ? 'text-green-400'
                            : testResults.isFailed
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                          Test Case Validation
                        </span>
                      </div>
                      <div className="bg-slate-800 rounded p-3 border border-slate-600 max-h-40 overflow-y-auto">
                        <pre className={`font-mono text-sm whitespace-pre-wrap leading-relaxed ${testResults.isPassed
                            ? 'text-green-100'
                            : testResults.isFailed
                              ? 'text-red-100'
                              : 'text-gray-100'
                          }`}>
                          {testResults.section}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center min-h-0">
                  <div className="text-center p-8">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-3 mx-auto border border-slate-500">
                      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm font-medium">Ready to run your code</p>
                    <p className="text-gray-400 text-xs mt-1">Click "Run Code" to see execution results</p>
                  </div>
                </div>
              )}
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
    </div>
  );
};

export default OutputConsole;