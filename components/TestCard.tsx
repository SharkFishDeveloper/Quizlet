import React, { useState } from "react";
import Test from "../interfaces/SingleTest";
import { Link } from "react-router-dom";
interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-sm transition-transform hover:scale-105 border border-gray-200 ">
      {/* Title */}
      <h3 className="text-md font-semibold text-[#31096b] mb-1">{test.title}</h3>

      {/* Name (if available) */}
      {test.name && <p className="text-xs text-gray-500">{test.name}</p>}

      {/* Description (or fallback) */}
      <p className="text-xs text-gray-700 mt-1">
        {test.description ? test.description : "No description available"}
      </p>

      {/* Difficulty Level */}
      <p className="text-xs font-medium mt-2">
        Difficulty:{" "}
        <span
          className={`${
            test.difficulty_level
              ? test.difficulty_level === "Hard"
                ? "text-red-500"
                : test.difficulty_level === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
              : "text-gray-400"
          }`}
        >
          {test.difficulty_level ? test.difficulty_level : "Not Specified"}
        </span>
      </p>

      {/* Duration & Questions Count */}
      <div className="mt-2 text-xs text-gray-600">
        <p>⏳ {test.duration} mins</p>
        <p>❓ {test.questions_count} questions</p>
      </div>

      {/* Button Section */}
      <div className="mt-3 flex justify-between items-center">
        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs text-[#31096b] hover:text-[#5a1ca8] transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* Start Button */}
        <Link to={`/test/${test.id}`}>
        <button className="bg-[#31096b] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#5a1ca8] transition duration-300 cursor-pointer">
          Start
        </button>
        </Link>
      </div>

      {/* Expanded Details */}
      {showMore && (
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          <p>Topic: {test.topic}</p>
          <p>🔻 Negative Marks: {test.negative_marks}</p>
          <p>✅ Correct Marks: {test.correct_answer_marks}</p>
        </div>
      )}
    </div>
  );
};

export default TestCard;
