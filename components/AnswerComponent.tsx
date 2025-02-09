import { useEffect, useState } from "react";
import { quizAtom } from "../atoms/IndiviualQuestion";
import { selectedOptionsAtom } from "../atoms/QuestionSolved";
import { useAtom } from "jotai";
import { FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";

const AnswerComponent = () => {
  const [quiz] = useAtom(quizAtom);
  const [quizoptions] = useAtom(selectedOptionsAtom);

  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrectAns] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);

  useEffect(() => {
    let count = 0;
    let correctCount = 0;

    quiz?.questions?.forEach((question) => {
      quizoptions.forEach((answered) => {
        if (answered.question === question.id.toString()) {
          count++;
          const correctOption = question.options.find((option) => option.is_correct);
          if (correctOption && answered.selectedOptionId === correctOption.id.toString()) {
            correctCount++;
          }
        }
      });
    });

    const correctAnswerMarks = parseInt(quiz?.correct_answer_marks as string) || 0;
    const negativeMarks = parseInt(quiz?.negative_marks as string) || 0;
    const scoreTotal = correctCount * correctAnswerMarks - (count - correctCount) * negativeMarks;

    setCorrectAns(correctCount);
    setAttempted(count);
    setWrongAns(count - correctCount);
    setScore(scoreTotal);
  }, [quiz?.correct_answer_marks, quiz?.negative_marks, quiz?.questions, quizoptions]);

  return (
    <div className="w-[90%] h-[76%] mx-auto p-5 bg-white shadow-lg rounded-lg border border-gray-200 text-sm">
      <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
        <FaClipboardList className="text-blue-500" /> Quiz Summary
      </h2>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Total Questions:</span>
          <span className="font-medium">{quiz?.questions_count}</span>
        </div>
        <div className="flex justify-between">
          <span>Attempted:</span>
          <span className="font-medium">{attempted}</span>
        </div>
        <div className="flex justify-between text-green-600 font-medium">
          <div className="flex items-center gap-1">
            <FaCheckCircle className="text-green-500 text-sm" />
            <span>Correct:</span>
          </div>
          <span>{correct}</span>
        </div>
        <div className="flex justify-between text-red-600 font-medium">
          <div className="flex items-center gap-1">
            <FaTimesCircle className="text-red-500 text-sm" />
            <span>Wrong:</span>
          </div>
          <span>{wrongAns}</span>
        </div>
        <div className="flex justify-between">
          <span>Correct Answer Marks:</span>
          <span className="font-medium">{quiz?.correct_answer_marks}</span>
        </div>
        <div className="flex justify-between">
          <span>Negative Marks:</span>
          <span className="font-medium">{quiz?.negative_marks}</span>
        </div>
        <div className="flex justify-between text-md font-bold text-purple-700 border-t pt-2">
          <span>Score:</span>
          <span>{score}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerComponent;
