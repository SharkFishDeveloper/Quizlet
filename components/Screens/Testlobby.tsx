import React, { useEffect, useState } from "react";
import Test from "../../interfaces/SingleTest"; // Ensure Test is correctly exported
import axios from "axios";
import TestCard from "../TestCard";

const TestLobby = () => {
  const [tests, setTests] = useState<Test[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.jsonbin.io/v3/b/67a61fccacd3cb34a8d9fbd5");
        if (response.data.record && typeof response.data.record === "object") {
            const extractedTest: Test = {
              id: response.data.record.id,
              name: response.data.record.name,
              title: response.data.record.title,
              description: response.data.record.description,
              difficulty_level: response.data.record.difficulty_level,
              topic: response.data.record.topic,
              time: response.data.record.time,
              is_published: response.data.record.is_published,
              created_at: response.data.record.created_at,
              updated_at: response.data.record.updated_at,
              duration: response.data.record.duration,
              end_time: response.data.record.end_time,
              negative_marks: Number(response.data.record.negative_marks), 
              correct_answer_marks: Number(response.data.record.correct_answer_marks), 
              questions_count: response.data.record.questions_count,
            };
  
            setTests([extractedTest]);
          } else {
            return alert("Unexpected response format: `record` is not an array");
          }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Test Lobby</h2>
      {tests !== null && tests.length > 0 ? (
        <TestCard test={tests[0]}/>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default TestLobby;
