import React from 'react';
import { useAtom } from 'jotai';
import { selectedOptionsAtom } from '../atoms/QuestionSolved';
import { Question } from '../interfaces/FullTest';

const QuestionComponent = ({ question, index }: { question: Question; index: number }) => {
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);

  // Find the selected option for the current question
  const selectedOption = selectedOptions.find((q) => q.question === question.id.toString())?.selectedOptionId;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prev) => {
      const updatedSelections = prev.map((q) =>
        q.question === question.id.toString() ? { ...q, selectedOptionId: optionId } : q
      );

      if (!prev.some((q) => q.question === question.id.toString())) {
        updatedSelections.push({ question: question.id.toString(), selectedOptionId: optionId });
      }

      return updatedSelections;
    });
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
      {/* Question Number */}
      <div className="text-lg font-semibold text-gray-700">Question {index + 1}</div>

      {/* Question Description */}
      <p className="mt-2 text-gray-600 text-lg break-words overflow-auto max-w-full">
        {question.description}
      </p>

      {/* Options Section */}
      <div className="mt-6 space-y-3">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id.toString())}
            className={`w-full text-left p-3 border border-gray-400 rounded-lg flex items-center transition-all duration-200 cursor-pointer ${
              selectedOption === option.id.toString() ? 'bg-purple-700 text-white' : 'hover:bg-gray-200'
            }`}
          >
            <span className="mr-3 font-bold">{optionLabels[i]}.</span>
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
};  

export default QuestionComponent;
