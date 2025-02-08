import axios from "axios";
import { useEffect, useState } from "react";
import { Quiz, Question } from "../../interfaces/FullTest";
import React from "react";
import Timer from "../Timer";   

const shuffleArray = (array: Question[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Test = () => {
  const [test, setTest] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: METHOD should be POST with id as parameter
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/67a61fccacd3cb34a8d9fbd5"
        );

        if (response.data.record) {
          let quizData: Quiz = response.data.record;
          
          // Shuffle questions before setting state
          if (quizData.shuffle) {
            quizData = { ...quizData, questions: shuffleArray(quizData.questions) };
          }

          setTest(quizData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading text until data is ready
  }

  return (
    <div>
    <Timer duration={900} id={test?.id.toString() as string}/>
      {test?.questions.map((question, index) => (
        <p key={question.id}>
          {index + 1}. {question.description}
        </p>
      ))}
    </div>
  );
};

export default Test;
