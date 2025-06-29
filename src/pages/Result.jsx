import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center text-red-500 text-xl">
          ⚠️ Invalid access. Please attempt the quiz first.
          <div className="mt-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const percentage = ((score / total) * 100).toFixed(2);
  const message =
    percentage >= 80
      ? "🎉 Excellent!"
      : percentage >= 60
      ? "👍 Good job!"
      : percentage >= 40
      ? "🙂 You can do better!"
      : "💪 Keep practicing!";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">Quiz Result</h1>
      <p className="text-xl text-gray-700 mb-2">
        You scored <span className="font-semibold">{score}</span> out of{" "}
        <span className="font-semibold">{total}</span>
      </p>
      <p className="text-lg text-gray-600 mb-4">Percentage: {percentage}%</p>
      <p className="text-xl font-medium text-green-600 mb-6">{message}</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/quiz")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retry Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
