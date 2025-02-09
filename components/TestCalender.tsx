import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedOptionsAtom } from "../atoms/QuestionSolved";
import { quizAtom } from "../atoms/IndiviualQuestion";
import {questionIndexAtom} from "../atoms/QuestionIndex";
import { reminderQuestion } from "../atoms/ReminderQuestion";

const TestCalender = () => {
  const [selectedOptions] = useAtom(selectedOptionsAtom);
  const [quiz] = useAtom(quizAtom);
  const [,setQuestionIndex] = useAtom(questionIndexAtom);
  const [reminderQuestions, setReminderQuestions] = useAtom(reminderQuestion);

  useEffect(() => {
    const storedReminders = localStorage.getItem(`test_${quiz?.id}_reminders`);
    if (storedReminders) {
      setReminderQuestions(JSON.parse(storedReminders)); // Load saved reminders into state
    }
  },[quiz?.id, setReminderQuestions]);


  const getOptionLabel = (index: number) => (index !== -1 ? String.fromCharCode(65 + index) : "");

  return (
    <div className="h-[15rem] w-[100%] overflow-auto p-4 ">
      <div className="flex flex-wrap gap-2">
        {quiz?.questions?.map((question, index) => {
          const selectedOption = selectedOptions.find(
            (q) => q.question === question.id.toString()
          );
          
          const selectedOptionIndex = selectedOption
            ? question.options.findIndex(
                (opt) => opt.id.toString() === selectedOption.selectedOptionId
              )
            : -1;

          return (
          <div
                  key={index}
                  onClick={() => setQuestionIndex(index)}
                  className={`w-[2rem] h-[2rem] flex items-center justify-center border rounded-md text-sm font-semibold cursor-pointer
                    ${
                      selectedOption
                        ? "bg-green-500 text-white" // Attempted questions → Green
                        : reminderQuestions?.includes(question.id.toString())
                        ? "bg-yellow-300 text-black" // Flagged but not attempted → Yellow
                        : "bg-gray-300 text-black" // Default → Gray
                    }
                  `}
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
