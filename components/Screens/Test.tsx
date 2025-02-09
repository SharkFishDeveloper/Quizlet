import axios from "axios";
import { useEffect, useState } from "react";
import { Quiz } from "../../interfaces/FullTest";
import React from "react";
import Timer from "../Timer";
import QuestionComponent from "../QuestionComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { selectedOptionsAtom } from "../../atoms/QuestionSolved";
import { useAtom } from "jotai";
import TestCalender from "../TestCalender";
import {quizAtom} from "../../atoms/IndiviualQuestion";
import {questionIndexAtom} from "../../atoms/QuestionIndex";
import SubmitButton from "../SubmitButton";
import { submitTestAtom } from "../../atoms/SubmitTestAtom";
import AnswerComponent from "../AnswerComponent";
import { marked } from "marked";
import { Link } from "react-router-dom";

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Test = () => {
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
  const [test, setTest] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setQuiz] = useAtom(quizAtom);
  const [questionIndex, setQuestionIndex] = useAtom(questionIndexAtom);
  const [submittedTests, ] = useAtom(submitTestAtom);
  const [submitted, setSubmitted] = useState(false);


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
          setQuiz(quizData);

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
  }, [setQuiz, setSelectedOptions]);

  useEffect(() => {
    if (test) {
      localStorage.setItem(`test-${test.id}`, JSON.stringify(selectedOptions));
      if(submittedTests !== null){
       if( submittedTests.includes(test.id.toString())){
        setSubmitted(true);
       } 
      }
    }
  }, [selectedOptions, submittedTests, test]);

  const handleNext = () => {
    if (test && currentIndex < test.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    setQuestionIndex(currentIndex);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setQuestionIndex(currentIndex);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-4 h-4 bg-gray-600 rounded-full animate-ping"></div>
        <p className="text-gray-600 font-medium mt-2">Loading...</p>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col items-center space-y-6 w-full h-screen">
      {test && (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-gray-800">{test.title}</h1>

         {!submitted ?
         (
          <div className="flex justify-evenly items-center w-full mt-4">
          <SubmitButton/>
          <Timer duration={900} id={test.id.toString()} />
          </div>
         ) : 
         (<div className="font-semibold text-green-600 items-center flex justify-center underline-offset-1 underline text-xl ">
          Solutions
         </div>)
          }

        </div>
      )}

      <div className="grid grid-cols-12 w-full h-[70vh] gap-2">

        {/* Left column */}
        <div
  className={`col-span-12 sm:col-span-3 justify-center items-center rounded-xl p-4 min-h-[53vh] sm:min-h-[70vh] overflow-auto md:mt-1
  ${submitted ? "flex bg-gray-200 sm:bg-white" : "hidden sm:flex bg-white"}`}
>
  {submitted && <AnswerComponent />}
</div>


        {/* Center (Main Question Area) */}
        <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-center p-4 bg-white shadow-lg rounded-lg max-h-full">
          {test && (
            <QuestionComponent
              question={test.questions[questionIndex]}
              index={questionIndex}
              test_id={test.id.toString()}
            />
          )}
        </div>


        {/* Right Sidebar (Moves Below Center Div on Small Screens) */}
        <div className="col-span-12 sm:col-span-3 flex flex-col justify-center items-center sm:mt-0 mt-3 sm:mb-0 mb-4 bg-gray-200 rounded-2xl ">
          <div className="flex flex-col items-center space-y-4 mt-2">

            <div className="h-[15rem] w-[18rem]  bg-white rounded-lg">
                <TestCalender/>
            </div>

            <div className="font-semibold">
              Question {questionIndex+1} of {test?.questions_count}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center w-full mt-4">
              <button
                onClick={handlePrev}
                disabled={questionIndex === 0}
                className={`px-4 py-2 rounded-lg text-white ${
                  questionIndex === 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-900"
                } mr-8 cursor-pointer h-[3rem]  w-[3rem]`}
              >
                <FaArrowLeft />
              </button>

              <button
                onClick={handleNext}
                //@ts-expect-error: s
                disabled={test && questionIndex === test.questions.length - 1}
                className={`px-4 py-2 rounded-lg text-white ${
                  test && questionIndex === test.questions.length - 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-900"
                } cursor-pointer h-[3rem]  w-[3rem]`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
            
          {submitted && <div className="bg-gray-200 w-[90vw] text-white font-medium flex flex-col justify-evenly items-center p-2 rounded-xl shadow-lg ml-[50%]">
            {/* Render Reading Material */}
            <div className="text-left w-full space-y-4 leading-relaxed">
            {(
               <div className="bg-white bg-opacity-10 p-4 rounded-lg text-black">
               <div
                 dangerouslySetInnerHTML={{
                   __html: marked(test?.questions[questionIndex].detailed_solution as string),
                 }}
               />
             </div>
)}
            </div>

            {/* Render Keywords */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-black underline">Keywords:</h3>
              <p className="text-gray-600 text-sm">
                {JSON.parse(test?.questions[questionIndex]?.reading_material?.keywords || "[]").join(", ")}
              </p>
            </div>

        {test?.questions[questionIndex]?.reading_material.content_sections && (
         <Link to={`/question/readmore/${questionIndex}`} className="text-black">Read more</Link>
        )}
</div>}

      </div>
    </div>
  );
};

export default Test;
