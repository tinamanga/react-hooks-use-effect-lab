import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle the countdown timer logic
  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false); // Call onAnswered callback when time runs out
      setTimeRemaining(10); // Reset the timer for the next question
      return;
    }

    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1); // Decrease time by 1 second
    }, 1000);

    // Cleanup the timer when the component unmounts or the timer is reset
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); 
    onAnswered(isCorrect); 
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
