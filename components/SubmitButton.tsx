import { useState, useEffect } from "react";
import { FiCloud } from "react-icons/fi";
import { submitTestAtom } from "../atoms/SubmitTestAtom";
import { quizAtom } from "../atoms/IndiviualQuestion";
import { useAtom } from "jotai";

const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quiz] = useAtom(quizAtom);
  const [, setSubmitTest] = useAtom(submitTestAtom);

  // Check localStorage on mount
  useEffect(() => {
    if (quiz?.id) {
      const storedTests = JSON.parse(localStorage.getItem("test_submit") || "[]");
      setSubmitTest(storedTests);
      if (storedTests.includes(quiz.id.toString())) {
        setIsSubmitting(true);
      }
    }
  }, [quiz?.id, setSubmitTest]);

  const handleSubmit = () => {
    if (!quiz?.id) {
      alert("Please try again later");
      return;
    }

    const storedTests = JSON.parse(localStorage.getItem("test_submit") || "[]");

    if (!storedTests.includes(quiz.id.toString())) {
      const updatedTests = [...storedTests, quiz.id.toString()];
      localStorage.setItem("test_submit", JSON.stringify(updatedTests));
      setSubmitTest(updatedTests);
      setIsSubmitting(true); // Disable button after submission
    } else {
      alert("Test already submitted");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-500 text-black font-semibold rounded-md shadow-md transition-all cursor-pointer"
      disabled={isSubmitting} // Disable button if already submitted
    >
      <FiCloud className="text-xl" />
      {isSubmitting ? "Submitted" : "Submit"}
    </button>
  );
};

export default SubmitButton;
