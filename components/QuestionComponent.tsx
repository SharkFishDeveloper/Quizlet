import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { FaFlag } from "react-icons/fa"; // Import flag icon
import { selectedOptionsAtom } from "../atoms/QuestionSolved";
import { Question } from "../interfaces/FullTest";
import { reminderQuestion } from "../atoms/ReminderQuestion";
import { submitTestAtom } from "../atoms/SubmitTestAtom";

const QuestionComponent = ({ question, index,test_id }: { question: Question; index: number,test_id:string }) => {
  const optionLabels = ["A", "B", "C", "D", "E", "F"];
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
  const [reminderQuestions, setReminderQuestions] = useAtom(reminderQuestion);
  const [submittedTests, ] = useAtom(submitTestAtom);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    if(submittedTests !== null){
      if(submittedTests.includes(test_id)){
        setSubmitted(true);
      }
    }
  }, [submittedTests, test_id]);

  const selectedOption = selectedOptions.find((q) => q.question === question.id.toString())?.selectedOptionId;

  const handleOptionSelect = (optionId: string) => {
    if(submitted)return;
    setSelectedOptions((prev) => {
      const updatedSelections = prev.map((q) =>
        q.question === question.id.toString() ? { ...q, selectedOptionId: optionId } : q
      );

      if (!prev.some((q) => q.question === question.id.toString())) {
        updatedSelections.push({ question: question.id.toString(), selectedOptionId: optionId });
      }
      localStorage.setItem(`test_${test_id}_reminders`, JSON.stringify(updatedSelections));
      return updatedSelections;
    });
  };

  const handleClearSelection = () => {
    if(submitted)return;
    setSelectedOptions((prev) => prev.filter((q) => q.question !== question.id.toString()));
  };

  const toggleReminder = () => {
    if(submitted)return;
    setReminderQuestions((prev) => {
      const updatedPrev = prev ?? []; // Ensure prev is always an array
      const updatedReminders = updatedPrev.includes(question.id.toString())
        ? updatedPrev.filter((id) => id !== question.id.toString())
        : [...updatedPrev, question.id.toString()];
  
      // Store the updated reminders in localStorage
      localStorage.setItem(`test_${test_id}_reminders`, JSON.stringify(updatedReminders));
  
      return updatedReminders; // Ensure state updates properly
    });
  };
  
  

  return (
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-5 border border-gray-300 relative">
      {/* Question Number */}
      <div className="text-lg font-semibold text-gray-800 flex justify-between">
        <span>Question {index + 1}</span>

        {/* Reminder Flag Button */}
        <button  onClick={toggleReminder}
          className={`text-xl transition-all cursor-pointer ${
            reminderQuestions && reminderQuestions.includes(question.id.toString()) ? "text-red-500" : "text-gray-400"
          }`}>
          <FaFlag />
        </button>
      </div>

      {/* Question Description */}
      <p className="mt-2 text-gray-700 text-lg break-words overflow-auto">{question.description}</p>

      {/* Options Section */}
      <div className="mt-4 space-y-2">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id.toString())}
            className={`w-full text-left p-3 border border-gray-400 rounded-md flex items-center transition-all duration-200 cursor-pointer ${
              selectedOption === option.id.toString() ? "bg-purple-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            <span className="mr-2 font-bold">{optionLabels[i]}.</span>
            {option.description}
          </button>
        ))}
      </div>

      {/* Show "Clear Selection" only if an option is selected */}
      {selectedOption && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleClearSelection}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
