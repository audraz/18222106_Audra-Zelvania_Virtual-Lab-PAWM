"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz2.module.css";

const QuizPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the main purpose of descriptive writing?",
      options: [
        "To argue a point.",
        "To create a vivid picture in the reader's mind.",
        "To give information.",
        "To tell a story.",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "Which of the following techniques is NOT used in descriptive writing?",
      options: [
        "Sensory details", 
        "Show, don’t tell", 
        "Figurative language", 
        "Listing random facts"],
      correct: 4,
    },
    {
      id: 3,
      question: "What does “show, don’t tell” mean in descriptive writing?",
      options: [
        "Using actions and feelings instead of simple statements",
        "Telling the reader the actions directly",
        "Listing items in a story",
        "Describing only what you see",
      ],
      correct: 1,
    },
    {
      id: 4,
      question: "Which is an example of figurative language?",
      options: [
        "The girl ran very fast.",
        "The girl ran as fast as lightning.",
        "The girl was fast.",
        "The girl is a runner.",
      ],
      correct: 2,
    },
    {
      id: 5,
      question: "In the introduction, what technique can be used to grab the reader's attention?",
      options: [
        "Starting with a list",
        "Adding a new fact in the conclusion",
        "Using a hook, like an interesting fact or a rhetorical question",
        "Describing every detail immediately",
      ],
      correct: 3,
    },
  ];

  const handleOptionClick = (index) => {
    const correctAnswer = questions[currentQuestion].correct - 1; 
    const newFeedback = Array(questions[currentQuestion].options.length).fill("");

    if (index === correctAnswer) {
      newFeedback[index] = "correct";
    } else {
      newFeedback[index] = "incorrect";
      newFeedback[correctAnswer] = "correct";
    }

    setAnswers({
      ...answers,
      [currentQuestion]: { selected: index, feedback: newFeedback },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(progress + 10);
    } else {
      setProgress(100);
      setShowModal(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setProgress(progress - 10);
    }
  };

  const handleBack = () => {
    router.push("/level/2");
  };

  const handleNextLevel = () => {
    router.push("/level/3");
  };

  const handleReturnHome = () => {
    router.push("/homepage");
  };

  const currentAnswer = answers[currentQuestion] || {};

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
        <h1 className={styles["title"]}>Quiz: Descriptive Essay</h1>
        <div className={styles["question"]}>
          <p className={styles["question-text"]}>
            {questions[currentQuestion].question}
          </p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`${styles["option"]} ${
                currentAnswer.feedback?.[index] === "correct"
                  ? styles["correct"]
                  : currentAnswer.feedback?.[index] === "incorrect"
                  ? styles["incorrect"]
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={!!currentAnswer.feedback} 
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
        {currentAnswer.feedback && (
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
            <p>You have completed Level 2!</p>
            <div className={styles["modal-buttons"]}>
            <button
                onClick={handleReturnHome}
                className={styles["home-button"]}
              >
                Back to Homepage
              </button>
              <button
                onClick={handleNextLevel}
                className={styles["next-level-button"]}
              >
                Go to Level 3
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
