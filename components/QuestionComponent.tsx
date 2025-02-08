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

  const handleClearSelection = () => {
    setSelectedOptions((prev) => prev.filter((q) => q.question !== question.id.toString()));
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-5 border border-gray-300">
      {/* Question Number */}
      <div className="text-lg font-semibold text-gray-800">Question {index + 1}</div>

      {/* Question Description */}
      <p className="mt-2 text-gray-700 text-lg break-words overflow-auto">
        {question.description}
      </p>

      {/* Options Section */}
      <div className="mt-4 space-y-2">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id.toString())}
            className={`w-full text-left p-3 border border-gray-400 rounded-md flex items-center transition-all duration-200 cursor-pointer ${
              selectedOption === option.id.toString() ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'
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
