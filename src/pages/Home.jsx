import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-10 text-center">
        {/* Custom Text Logo */}
        <div className="text-5xl font-extrabold text-indigo-700 mb-4 tracking-wide">
          <span className="text-indigo-500">Quiz</span>ify
        </div>

        <p className="text-gray-600 text-lg mb-8">
          Test your knowledge with engaging quizzes.
        </p>

        <Link to="/quiz">
          <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-xl text-lg transition duration-300 ease-in-out">
            Start Quiz
          </button>
        </Link>

        <div className="mt-6 text-sm text-gray-500">
          Created by <span className="font-semibold text-indigo-600">Sachit Pandey</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
