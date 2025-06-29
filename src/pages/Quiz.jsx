import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../fonts/stylesheet.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Quiz = () => {
  const navigate = useNavigate();

  const questions = [
    {
      question: "The length of the bridge a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds is:",
      options: ["200m", "225m", "240m", "250m"],
      ans: "240m",
    },
    {
      question: "A grocer has a sale of Rs. 6435, Rs. 6927... How much sale in sixth month to average Rs. 6500?",
      options: ["Rs.4991", "Rs.5991", "Rs.6001", "Rs.6991"],
      ans: "Rs.4991",
    },
    {
      question: "If A completes a work in 12 days and B in 16 days, how long will they take together?",
      options: ["6.86 days", "7 days", "7.5 days", "9 days"],
      ans: "6.86 days",
    },
    {
      question: "What is the square root of 2025?",
      options: ["45", "40", "50", "55"],
      ans: "45",
    },
    {
      question: "The average of first five multiples of 3 is:",
      options: ["9", "10", "11", "12"],
      ans: "9",
    },
    {
      question: "What is the missing number in series: 2, 4, 8, 16, ?",
      options: ["32", "20", "24", "30"],
      ans: "32",
    },
    {
      question: "The sum of angles in a triangle is:",
      options: ["180°", "360°", "90°", "270°"],
      ans: "180°",
    },
    {
      question: "Which is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      ans: "2",
    },
    {
      question: "Which number is divisible by both 3 and 5?",
      options: ["30", "14", "12", "25"],
      ans: "30",
    },
    {
      question: "The value of (3 + 5) × 2 is:",
      options: ["16", "13", "10", "8"],
      ans: "16",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePrevious = () => {
    if (!canEdit) return;
    setCurrentQuestionIndex((prev) =>
      prev === 0 ? questions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!canEdit) return;
    setCurrentQuestionIndex((prev) =>
      prev === questions.length - 1 ? 0 : prev + 1
    );
  };

  const handleAnswer = (option) => {
    if (!canEdit) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleSkip = () => {
    if (!canEdit) return;
    handleNext();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCanEdit(false); // lock answers
  };

  const handleFinish = () => {
    navigate("/result", {
      state: {
        score: Object.keys(selectedAnswers).reduce((acc, key) => {
          return selectedAnswers[key] === questions[key].ans ? acc + 1 : acc;
        }, 0),
        total: questions.length,
      },
    });
  };

  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-between p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center border-b py-2 px-6">
        <div className="text-3xl font-bold text-indigo-700">Quizify</div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleGuidelines}
            className="border px-4 py-1 rounded text-indigo-700 border-indigo-300 hover:bg-indigo-50"
          >
            Guidelines
          </button>
          <span className="text-indigo-800 font-semibold">
            Time: {currentTime.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>
      </div>

      {/* Guidelines Box */}
      {showGuidelines && (
        <div className="p-4 bg-yellow-100 text-yellow-800 my-2 rounded-lg shadow-md mx-6">
          <p>📋 Read each question carefully and select your answer. You can skip and return later.</p>
        </div>
      )}

      {/* Main Quiz Section */}
      <div className="flex flex-col lg:flex-row flex-grow m-4 border rounded-lg shadow">
        <div className="w-full lg:w-2/3 p-6">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-gray-800 mb-4">{currentQuestion.question}</p>

          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              disabled={!canEdit}
              onClick={() => handleAnswer(option)}
              className={`block w-full text-left px-4 py-2 mb-2 rounded border ${
                selectedAnswers[currentQuestionIndex] === option
                  ? "bg-indigo-100 border-indigo-500 text-indigo-800"
                  : "bg-white border-gray-300"
              } ${!canEdit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50'}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Right Navigation Panel */}
        <div className="w-full lg:w-1/3 p-6 border-l flex flex-col justify-between">
          <div className="flex justify-between mb-4">
            <button onClick={handlePrevious} disabled={!canEdit}>
              <IoIosArrowBack size={28} className={!canEdit ? "opacity-50" : ""} />
            </button>
            <button onClick={handleNext} disabled={!canEdit}>
              <IoIosArrowForward size={28} className={!canEdit ? "opacity-50" : ""} />
            </button>
          </div>

          <div className="flex justify-center space-x-2 flex-wrap">
            {questions.map((_, index) => (
              <button
                key={index}
                disabled={!canEdit}
                className={`w-8 h-8 rounded-full border ${
                  index === currentQuestionIndex
                    ? "bg-indigo-700 text-white"
                    : selectedAnswers[index]
                    ? "bg-green-300 text-black"
                    : "bg-gray-100"
                } ${!canEdit ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col space-y-2">
            <button
              onClick={handleSkip}
              disabled={!canEdit}
              className="py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canEdit}
              className="py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Submit
            </button>
            <button
              onClick={handleFinish}
              className="py-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* Score */}
      {submitted && (
        <div className="text-center mt-6 text-lg font-semibold text-green-700">
          You scored {Object.keys(selectedAnswers).reduce((acc, key) => {
            return selectedAnswers[key] === questions[key].ans ? acc + 1 : acc;
          }, 0)} out of {questions.length}
        </div>
      )}
    </div>
  );
};

export default Quiz;
