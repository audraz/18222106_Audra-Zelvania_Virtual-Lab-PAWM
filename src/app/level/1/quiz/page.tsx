"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz.module.css";

const QuizPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(50); 
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [feedbackColors, setFeedbackColors] = useState([]); 
  const [answers, setAnswers] = useState({}); 
  const [showModal, setShowModal] = useState(false); 

  const questions = [
    {
      id: 1,
      question: "What is the main purpose of an academic essay?",
      options: [
        "To entertain the reader.",
        "To persuade the reader of a position or perspective through arguments supported by evidence and analysis.",
        "To critique other academic works.",
        "To explain information very briefly.",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "What is the first stage in the essay writing process?",
      options: ["Writing.", "Revision.", "Preparation.", "Making a conclusion."],
      correct: 2,
    },
    {
      id: 3,
      question: "What should be done in the preparation stage?",
      options: [
        "Making a conclusion and structuring arguments.",
        "Structuring the essay with a clear outline.",
        "Understanding the assignment, choosing a topic, and creating an initial thesis.",
        "Checking grammar and formatting.",
      ],
      correct: 2,
    },
    {
      id: 4,
      question: "What is the function of a topic sentence in a paragraph?",
      options: [
        "To end the paragraph.",
        "To introduce the purpose of the paragraph.",
        "To state the thesis of the essay.",
        "To summarize the entire essay.",
      ],
      correct: 1,
    },
    {
      id: 5,
      question: "What should be done during the revision stage?",
      options: [
        "Adding new paragraphs.",
        "Checking and improving grammar, structure, and formatting.",
        "Removing the thesis.",
        "Writing the essay without considering arguments.",
      ],
      correct: 1,
    },
  ];

  const handleOptionClick = (index) => {
    const correctAnswer = questions[currentQuestion].correct;
    const newColors = Array(questions[currentQuestion].options.length).fill(""); 
    const newAnswers = { ...answers, [currentQuestion]: index }; 
    setAnswers(newAnswers);

    if (index === correctAnswer) {
      newColors[index] = "correct";
    } else {
      newColors[index] = "incorrect"; 
      newColors[correctAnswer] = "correct"; 
    }
    setFeedbackColors(newColors);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(progress + 10); 
      const nextAnswer = answers[currentQuestion + 1]; 
      updateFeedbackColors(nextAnswer);
    } else {
      setProgress(100); 
      setShowModal(true); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setProgress(progress - 10);
      const previousAnswer = answers[currentQuestion - 1]; 
      updateFeedbackColors(previousAnswer);
    }
  };

  const updateFeedbackColors = (answer) => {
    if (answer !== undefined) {
      const correctAnswer = questions[currentQuestion].correct;
      const newColors = Array(questions[currentQuestion].options.length).fill("");
      if (answer === correctAnswer) {
        newColors[answer] = "correct";
      } else {
        newColors[answer] = "incorrect";
        newColors[correctAnswer] = "correct";
      }
      setFeedbackColors(newColors);
    } else {
      setFeedbackColors([]); 
    }
  };

  const handleBack = () => {
    router.push("/level/1"); 
  };

  const handleNextLevel = () => {
    router.push("/level/2"); 
  };

  const handleReturnHome = () => {
    router.push("/homepage");
  };

  return (
    <div className={styles["container"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <button onClick={handleBack} className={styles["back-button"]}>
          <Image src="/back.png" alt="Back" width={24} height={24} />
        </button>
        <div className={styles["progress-bar-container"]}>
          <div
            className={styles["progress-bar"]}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className={styles["quiz-container"]}>
        <h1 className={styles["title"]}>Quiz: Introduction to Essay</h1>
        <div className={styles["question"]}>
          <p className={styles["question-text"]}>
            {questions[currentQuestion].question}
          </p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`${styles["option"]} ${
                feedbackColors[index] === "correct"
                  ? styles["correct"]
                  : feedbackColors[index] === "incorrect"
                  ? styles["incorrect"]
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={feedbackColors.length > 0} 
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={styles["navigation"]}>
        {currentQuestion > 0 && (
          <button
            onClick={handlePreviousQuestion}
            className={styles["previous-button"]}
          >
            Previous
          </button>
        )}
        {feedbackColors.length > 0 && (
          <button
            onClick={handleNextQuestion}
            className={styles["next-button"]}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Finish Quiz"}
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <h2>Congratulations!</h2>
            <p>You have completed Level 1!</p>
            <div className={styles["modal-buttons"]}>
              <button
                onClick={handleNextLevel}
                className={styles["next-level-button"]}
              >
                Go to Level 2
              </button>
              <button
                onClick={handleReturnHome}
                className={styles["home-button"]}
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
