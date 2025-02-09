import React, { useState, useEffect } from "react";
import { CgAlarm } from "react-icons/cg";
import { submitTestAtom } from "../atoms/SubmitTestAtom";
import { useAtom } from "jotai";

const Timer = ({ duration, id }: { duration: number; id: string }) => {
  
  const [, setSubmitTest] = useAtom(submitTestAtom);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`timeLeft_${id}`);
    return savedTime ? parseInt(savedTime, 10) : duration;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setSubmitTest((prev) => (prev ? [...prev, id] : [id]));
      localStorage.setItem("test_submit", JSON.stringify([...JSON.parse(localStorage.getItem("test_submit") || "[]"), id]));
      return;
    };

    localStorage.setItem(`timeLeft_${id}`, timeLeft.toString());
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem(`timeLeft_${id}`, newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, id]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-white rounded-lg shadow-md w-[6.5rem]">
      <CgAlarm className="text-gray-800 text-2xl " />
      <span className="text-md font-semibold text-black">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
