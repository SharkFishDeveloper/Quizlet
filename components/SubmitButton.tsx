import React, { useState } from "react";
import { FiCloud } from "react-icons/fi"; // Cloud upload icon

const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000); // Simulate a delay
  };

  return (
    <button
      onClick={handleSubmit}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-500 text-black font-semibold rounded-md shadow-md transition-all cursor-pointer"
      disabled={isSubmitting}
    >
      <FiCloud className="text-xl" />
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
