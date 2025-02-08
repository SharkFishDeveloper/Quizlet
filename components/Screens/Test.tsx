import axios from "axios";
import { useEffect, useState } from "react";
import { Quiz } from "../../interfaces/FullTest";
import React from "react";
import Timer from "../Timer";
import QuestionComponent from "../QuestionComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { selectedOptionsAtom } from "../../atoms/QuestionSolved";
import { useAtom } from "jotai";

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Test = () => {
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
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

          // Load previous selections from localStorage
          const savedSelections = localStorage.getItem(`test-${quizData.id}`);
          if (savedSelections) {
            setSelectedOptions(JSON.parse(savedSelections));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setSelectedOptions]);

  // Save selectedOptions to localStorage whenever it changes
  useEffect(() => {
    if (test) {
      localStorage.setItem(`test-${test.id}`, JSON.stringify(selectedOptions));
    }
  }, [selectedOptions, test]);

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
    <div className="flex flex-col items-center space-y-6 w-full h-screen">
      {test && (
        <div className="mt-4">
          <Timer duration={900} id={test.id.toString()} />
        </div>
      )}

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-12 w-full h-[70vh] gap-2">
        {/* Left Sidebar (Hidden on Small Screens) */}
        <div className="hidden sm:block sm:col-span-3"></div>

        {/* Center (Main Question Area) */}
        <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-center p-4 bg-white shadow-lg rounded-lg max-h-full">
          {test && (
            <QuestionComponent
              question={test.questions[currentIndex]}
              index={currentIndex}
            />
          )}
        </div>

        {/* Right Sidebar (Moves Below Center Div on Small Screens) */}
        <div className="col-span-12 sm:col-span-3 flex flex-col justify-center items-center sm:mt-0 mt-3 sm:mb-0 mb-4 bg-gray-200 rounded-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-[15rem] w-[12rem] border border-black">
              Test Calendar
            </div>

            <div className="font-semibold">
              Question {currentIndex + 1} of {test?.questions_count}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center w-full mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-lg text-white ${
                  currentIndex === 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-900"
                } mr-8 cursor-pointer h-[3rem]  w-[3rem]`}
              >
                <FaArrowLeft />
              </button>

              <button
                onClick={handleNext}
                //@ts-expect-error: s
                disabled={test && currentIndex === test.questions.length - 1}
                className={`px-4 py-2 rounded-lg text-white ${
                  test && currentIndex === test.questions.length - 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-900"
                } cursor-pointer h-[3rem]  w-[3rem]`}
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
