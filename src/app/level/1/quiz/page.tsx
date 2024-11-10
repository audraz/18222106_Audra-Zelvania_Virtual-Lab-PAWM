"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz.module.css";

type Answer = {
  selected: number; // Indeks jawaban yang dipilih
  feedback: string[]; // Feedback untuk setiap opsi
};

const QuizPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({}); 
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
      correct: 2,
    },
    {
      id: 2,
      question: "What is the first stage in the essay writing process?",
      options: ["Writing.", "Revision.", "Preparation.", "Making a conclusion."],
      correct: 3,
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
      correct: 3,
    },
  ];

  const handleOptionClick = (index: number) => {
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
    router.push("/level/1");
  };

  const handleNextLevel = () => {
    router.push("/level/2");
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
        <h1 className={styles["title"]}>Quiz: Introduction to Essay</h1>
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
            <p>You have completed Level 1!</p>
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
                Go to Level 2
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
