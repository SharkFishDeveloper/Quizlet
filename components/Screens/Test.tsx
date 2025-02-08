import axios from "axios";
import { useEffect, useState } from "react";
import { Quiz } from "../../interfaces/FullTest";
import React from "react";
import Timer from "../Timer";
import QuestionComponent from "../QuestionComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Test = () => {
  const [test, setTest] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/67a61fccacd3cb34a8d9fbd5"
        );

        if (response.data.record) {
          let quizData: Quiz = response.data.record;

          if (quizData.shuffle) {
            quizData = {
              ...quizData,
              questions: shuffleArray(quizData.questions).map((question) => ({
                ...question,
                options: shuffleArray(question.options),
              })),
            };
          }

          setTest(quizData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (test && currentIndex < test.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full h-screen">
      {test && (
        <div className="mt-4">
          <Timer duration={900} id={test.id.toString()} />
        </div>
      )}



      <div className="grid grid-cols-12 w-full h-[80vh]">
        {/* Left Sidebar */}
        <div className="col-span-3 ">
        
        </div>

        {/* Center (Main Question Area) */}
        <div className="col-span-6 flex flex-col justify-center items-center p-6 bg-white shadow-lg rounded-lg">
          {test && (
            <QuestionComponent
              question={test.questions[currentIndex]}
              index={currentIndex}
            />
          )}
          
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 flex justify-center items-center bg-cyan-200">

        <div className="bg-green-200 h-[60%] flex-col">
        <div className="h-[15rem] w-[12rem] bg-pink-300">Test calender</div>

<div className="bg-red-200 font-semibold flex justify-center">Question {currentIndex+1} of {test?.questions_count}</div>
<div className="flex justify-center w-full mt-4 bg-green-500">
    <button
      
      onClick={handlePrev}
      disabled={currentIndex === 0}
      className={`px-4 py-2 rounded-lg text-white ${
        currentIndex === 0
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-purple-700 hover:bg-purple-900"
      } mr-4 cursor-pointer`}
    >
      <FaArrowLeft />
    </button>

    <button
      onClick={handleNext}
      disabled={test && currentIndex === test.questions.length - 1}
      className={`px-4 py-2 rounded-lg text-white ${
        test && currentIndex === test.questions.length - 1
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-purple-700 hover:bg-purple-900"
      } cursor-pointer`}
    >
      <FaArrowRight />
    </button>
  </div>

        </div>
          
        </div>
      </div>


    </div>
  );
};

export default Test;
