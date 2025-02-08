import React from "react";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "../atoms/QuestionSolved";
import { quizAtom } from "../atoms/IndiviualQuestion";
import {questionIndexAtom} from "../atoms/QuestionIndex";

const TestCalender = () => {
  const [selectedOptions] = useAtom(selectedOptionsAtom);
  const [quiz] = useAtom(quizAtom);
  const [,setQuestionIndex] = useAtom(questionIndexAtom);

  // Convert index (0,1,2,3) to A, B, C, D
  const getOptionLabel = (index: number) => (index !== -1 ? String.fromCharCode(65 + index) : "");

  return (
    <div className="h-[15rem] w-[100%] overflow-auto p-4 ">

      <div className="flex flex-wrap gap-2">
        {quiz?.questions?.map((question, index) => {
          const selectedOption = selectedOptions.find(
            (q) => q.question === question.id.toString()
          );
          
          // setQuestionIndex({questionIndex:index});
          // Find selected option index
          const selectedOptionIndex = selectedOption
            ? question.options.findIndex(
                (opt) => opt.id.toString() === selectedOption.selectedOptionId
              )
            : -1;

          return (
            <div
              key={index}
              onClick={()=>setQuestionIndex(index)}
              className={`w-[1.8rem] h-[1.8rem] flex items-center justify-center border rounded-md text-sm font-semibold ${
                selectedOption ? "bg-green-500 text-white" : "bg-gray-300 text-black"
              } cursor-pointer`}
            >
              {index + 1} {getOptionLabel(selectedOptionIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestCalender;
