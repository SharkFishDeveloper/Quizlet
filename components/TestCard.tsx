import React, { useEffect, useState } from "react";
import Test from "../interfaces/SingleTest";
import { Link } from "react-router-dom";
import { selectedOptionsAtom } from '../atoms/QuestionSolved';
import { useAtom } from "jotai";
import { reminderQuestion } from "../atoms/ReminderQuestion";
import { submitTestAtom } from "../atoms/SubmitTestAtom";

interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const [attempted, setAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [, setReminderQuestions] = useAtom(reminderQuestion);
  const [, setSelectedOptions] = useAtom(selectedOptionsAtom);
  const [isSolved, setIsSolved] = useState(false);
  const [, setSubmittedTests] = useAtom(submitTestAtom);
  
  
  useEffect(() => {
    // Check if the test was previously attempted
    const storedTime = localStorage.getItem(`timeLeft_${test.id}`);
    if (localStorage.getItem(`test-${test.id}`) !== null && storedTime !== null) {
      setAttempted(true);
      setTimeLeft(parseInt(storedTime, 10)); // Convert to number
    }

    // Check if the test is marked as solved
    const submittedTests = JSON.parse(localStorage.getItem("test_submit") || "[]");
    if (submittedTests.includes(test.id.toString())) {
      setIsSolved(true);
    }
  }, [test.id]);

  const handleResetTest = () => {
    localStorage.removeItem(`test-${test.id}`);
    localStorage.removeItem(`timeLeft_${test.id}`);
    localStorage.removeItem(`test_${test.id}_reminders`);

    const submittedTests = JSON.parse(localStorage.getItem("test_submit") || "[]");
    const updatedTests = submittedTests.filter((id: string) => id !== test.id.toString());
    localStorage.setItem("test_submit", JSON.stringify(updatedTests));

    setAttempted(false);
    setTimeLeft(null);
    setSelectedOptions([]);
    setReminderQuestions([]);
    setIsSolved(false)
    if(submittedTests !== null){
      //@ts-expect-error: S
      setSubmittedTests((prev)=>prev.filter((id: string) => id !== test.id.toString()));
    }
  };

  const [showMore, setShowMore] = useState(false);



  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-sm transition-transform hover:scale-105 border border-gray-200">
      {/* Title */}
      <h3 className="text-md font-semibold text-[#31096b] mb-1">{test.title}</h3>

      {/* Name (if available) */}
      {test.name && <p className="text-xs text-gray-500">{test.name}</p>}

      {/* Description */}
      <p className="text-xs text-gray-700 mt-1">
        {test.description ? test.description : "No description available"}
      </p>

      {/* Difficulty Level */}
      <p className="text-xs font-medium mt-2">
        Difficulty:{" "}
        <span
          className={`${
            test.difficulty_level === "Hard"
              ? "text-red-500"
              : test.difficulty_level === "Medium"
              ? "text-yellow-500"
              : "text-green-500"
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

      {/* Show Resume/Reset Banner if Attempted */}
      {attempted && (
        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 text-xs text-yellow-800 rounded-md">
          {timeLeft && timeLeft > 0 ? (
            <>
              {!isSolved && <p className="mb-1">⏳ You have an unfinished test with {Math.floor(timeLeft / 60)} minutes left.</p>}
              <div className="flex gap-2">
                {!isSolved && <Link to={`/test/${test.id}`}>
                  <button className="bg-[#31096b] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#5a1ca8] transition duration-300 cursor-pointer">
                    Resume Test
                  </button>
                </Link>}
                <button
                  onClick={handleResetTest}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
                >
                  Reset Test
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-1">Your test time has expired. You can reset the test.</p>
              <button
                onClick={handleResetTest}
                className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Reset Test
              </button>
            </>
          )}
        </div>
      )}

      {/* Solved Badge & See Solutions */}
      {isSolved && (
        <div className="mt-3 p-2 bg-green-100 border border-green-300 text-xs text-green-800 rounded-md flex justify-between items-center">
          <span className="font-semibold">✅ Solved</span>
          <Link to={`/test/${test.id}`}>
            <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer">
              See Solutions
            </button>
          </Link>
        </div>
      )}

      {/* Button Section */}
      <div className="mt-3 flex justify-between items-center">
        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs text-[#31096b] hover:text-[#5a1ca8] transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* Start Button (Only if not attempted) */}
        {!attempted && !isSolved && (
          <Link to={`/test/${test.id}`}>
            <button className="bg-[#31096b] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#5a1ca8] transition duration-300 cursor-pointer">
              Start
            </button>
          </Link>
        )}
      </div>

      {/* Expanded Details */}
      {showMore && (
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          <p>Topic: {test.topic}</p>
          <p>🔻 Negative Marks: {test.negative_marks}</p>
          <p>✅ Correct Marks: {test.correct_answer_marks}</p>
          <p>Date created - {test.created_at.substring(0,10)}</p>
        </div>
      )}
    </div>
  );
};

export default TestCard;
