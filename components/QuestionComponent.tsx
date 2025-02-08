import React from 'react'
import { Question } from '../interfaces/FullTest'

const QuestionComponent = ({ question, index }: { question: Question; index: number }) => {
  // Option labels (A, B, C, D, etc.)
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F']; // Extend if needed

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
      {/* Question Number */}
      <div className="text-lg font-semibold text-gray-700">
        Question {index + 1}
      </div>

      {/* Question Description - Prevent Overflow */}
      <p className="mt-2 text-gray-600 text-lg break-words overflow-auto max-w-full">
        {question.description}
      </p>

      {/* Options Section with Labels */}
      <div className="mt-6 space-y-3">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            className="w-full text-left p-3 border border-gray-400 rounded-lg flex items-center hover:bg-purple-700 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <span className="mr-3 font-bold ">{optionLabels[i]}.</span>
            {option.description}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionComponent
