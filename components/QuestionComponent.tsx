import React from 'react'
import { Question } from '../interfaces/FullTest'

const QuestionComponent = ({question,index}:{question:Question,index:number}) => {
  return (
    <div className="h-[45vh] ">
        <p>{index+1}</p>
        <p>{question.description}</p>
        <div className="mt-4 space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="w-full text-left p-2 border border-gray-600 rounded-md hover:bg-gray-700 transition cursor-pointer"
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionComponent