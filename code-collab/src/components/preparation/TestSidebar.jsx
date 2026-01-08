import React from "react";

const TestSidebar = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  marked,
  userAnswers = [],
}) => {
  return (
    <div className="w-80 bg-white shadow-xl p-6 min-h-screen border-r border-gray-200 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Questions</h2>

      {/* GRID OF SMALL SQUARE BUTTONS */}
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => {
          const isActive = currentQuestion === index;
          const isAnswered = userAnswers[index]?.selected !== undefined;
          const isMarked = marked[index];

          let bgColor = "bg-gray-100 text-gray-700 border-gray-300";

          if (isActive) bgColor = "bg-blue-600 text-white border-blue-700";
          else if (isMarked) bgColor = "bg-purple-600 text-white border-purple-700";
          else if (isAnswered) bgColor = "bg-green-500 text-white border-green-600";

          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`h-10 w-10 flex items-center justify-center rounded-md border font-semibold transition-all duration-150 ${bgColor} hover:opacity-90`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* LEGEND */}
      <div className="mt-10">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
            <span>Current</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Answered</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
            <span>Marked</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
            <span>Not Answered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSidebar;
