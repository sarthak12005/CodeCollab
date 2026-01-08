import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/Header";
import axios from "axios";
import TestSidebar from "../../components/preparation/TestSidebar";
import { useAuth } from "../../context/userContext";

const Aptitude = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [testMode, setTestMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const [markedQuestions, setMarkedQuestions] = useState([]);

  const categories = ["all", "Quantitative", "Logical", "Verbal"];

  useEffect(() => {
    const fetchAptitudeQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/preparation/aptitude`
        );
        const result = response.data;

        const formatted = result.data.map((q) => ({
          id: q._id,
          category: q.topic || "General",
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          company: q.company,
          timeLimit: q.timeLimit,
        }));

        setQuestions(formatted);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAptitudeQuestions();
  }, []);

  useEffect(() => {
    if (testMode && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testMode && timeLeft === 0) {
      handleSubmitTest();
    }
  }, [timeLeft, testMode]);

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const startTest = () => {
    setTestMode(true);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setMarkedQuestions([]);
    setTimeLeft(filteredQuestions.length * 60);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct:
        selectedAnswer === filteredQuestions[currentQuestion].correctAnswer,
    };

    setUserAnswers(updatedAnswers);

    if (selectedAnswer === filteredQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      handleSubmitTest();
    }
  };

  const markForReview = () => {
    const updatedMarks = [...markedQuestions];
    updatedMarks[currentQuestion] = true;
    setMarkedQuestions(updatedMarks);
  };

  const handleSubmitTest = () => {
    setTestMode(false);
    setShowResult(true);
  };

  const resetTest = () => {
    setTestMode(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setMarkedQuestions([]);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // ------------------------------
  // LOADING SCREEN
  // ------------------------------
  if (loading) {
    return (
      <div
        className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme.text.secondary}>Loading Questions...</p>
        </div>
      </div>
    );
  }

  // ------------------------------
  // RESULT SCREEN
  // ------------------------------
  if (showResult) {
    return (
      <div className={`min-h-screen ${theme.bg.primary}`}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`${theme.bg.card} rounded-lg shadow p-8 text-center`}>
            <div className="mb-6">
              {score >= filteredQuestions.length * 0.7 ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}

              <h2 className="text-3xl font-bold">Test Completed!</h2>
              <p className="text-xl mt-2">
                You scored {score} out of {filteredQuestions.length}
              </p>
              <p className="text-lg mt-1 text-gray-500">
                Accuracy: {Math.round((score / filteredQuestions.length) * 100)}
                %
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold">Correct</h3>
                <p className="text-2xl font-bold text-green-600">{score}</p>
              </div>

              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-semibold">Incorrect</h3>
                <p className="text-2xl font-bold text-red-600">
                  {filteredQuestions.length - score}
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold">Total</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredQuestions.length}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetTest}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <RotateCcw className="inline w-5 h-5 mr-2" />
                Try Again
              </button>

              <button
                onClick={() => navigate("/preparation")}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                <ArrowLeft className="inline w-5 h-5 mr-2" />
                Back to Preparation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------
  // TEST MODE UI WITH SIDEBAR
  // ------------------------------
  if (testMode) {
    const question = filteredQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex w-full">
          {/* LEFT SIDE SIDEBAR */}
          <TestSidebar
            questions={filteredQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            marked={markedQuestions}
            userAnswers={userAnswers}
          />

          {/* MAIN QUESTION PANEL */}
          <div className="flex-1 p-8">
            {/* Header info */}
            <div className="bg-white p-6 rounded-lg shadow mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Question {currentQuestion + 1} of {filteredQuestions.length}
                </h2>
                <p className="text-gray-500">
                  {question.category} • {question.difficulty}
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center text-orange-600">
                  <Clock className="w-6 h-6 mr-2" />
                  <span className="font-mono text-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-gray-700">
                  Score: {score}/{currentQuestion}
                </div>
              </div>
            </div>

            {/* QUESTION */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-6">{question.question}</h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <strong className="mr-3">
                      {String.fromCharCode(65 + index)}.
                    </strong>
                    {option}
                  </button>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={markForReview}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Mark for Review
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === ""}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {currentQuestion === filteredQuestions.length - 1
                    ? "Submit Test"
                    : "Next Question"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // MAIN HOME PAGE (BEFORE TEST STARTS)
  // -----------------------------------
  return (
    <div className={`min-h-screen ${theme.bg.primary}`}>
      <Header />

      {/* TITLE */}
      <div className={`${theme.bg.secondary} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate("/preparation")}
            className="flex items-center text-sm text-gray-700 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Preparation
          </button>

          <h1 className="text-3xl font-bold mt-3">Aptitude Tests</h1>
          <p className="text-gray-500">
            Practice quantitative, logical, and verbal reasoning questions
          </p>
        </div>
      </div>

      {/* CATEGORY SELECT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Choose a Category</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-5 text-center border rounded-lg transition ${
                  selectedCategory === category
                    ? "border-blue-600 bg-blue-100 shadow-lg scale-105"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                <h3 className="font-medium">
                  {category === "all" ? "All Categories" : category}
                </h3>
                <p className="text-xs text-gray-500">
                  {category === "all"
                    ? `${questions.length} total`
                    : `${
                        questions.filter((q) => q.category === category).length
                      } available`}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* START TEST CARD */}
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-3">
            Start {selectedCategory === "all" ? "Aptitude" : selectedCategory}{" "}
            Test
          </h2>

          <p className="text-gray-600 mb-6">
            {filteredQuestions.length} questions • {filteredQuestions.length}{" "}
            minutes
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-blue-700 font-semibold">Questions</h3>
              <p className="text-3xl font-bold text-blue-700">
                {filteredQuestions.length}
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="text-green-700 font-semibold">Time</h3>
              <p className="text-3xl font-bold text-green-700">
                {filteredQuestions.length} min
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-lg">
              <h3 className="text-purple-700 font-semibold">Category</h3>
              <p className="text-2xl font-bold text-purple-700">
                {selectedCategory === "all" ? "Mixed" : selectedCategory}
              </p>
            </div>
          </div>

          <button
            onClick={startTest}
            className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg hover:bg-blue-700"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aptitude;
