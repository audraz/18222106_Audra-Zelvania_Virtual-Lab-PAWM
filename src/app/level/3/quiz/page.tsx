"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz3.module.css";

const QuizPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the main purpose of a narration essay?",
      options: [
        "To record daily events in a diary format.",
        "To tell a story that has a clear point or lesson.",
        "To give a detailed description of an entire life.",
        "To showcase fictional storytelling skills.",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "Which of the following is an example of a good topic for a narration essay?",
      options: [
        "How to make a birthday cake.", 
        "Your fondest memory.", 
        "A list of your favorite books.", 
        "The most attractive movie star."],
      correct: 2,
    },
    {
      id: 3,
      question: "What should a narration essay include?",
      options: [
        "A moral at the end of the story.",
        "An introduction, thesis, body, and conclusion.",
        "Flashbacks to add suspense.",
        "Lists of random memories",
      ],
      correct: 4,
    },
    {
      id: 4,
      question: "In what order should events be presented in a narration essay?",
      options: [
        "Alphabetical order.",
        "Reverse order.",
        "Chronological order.",
        "By importance.",
      ],
      correct: 3,
    },
    {
      id: 5,
      question: "Why is it important to use transitional words in a narration essay?",
      options: [
        "To add humor to the story.",
        "To show the sequence of events clearly.",
        "To make the essay appear longer.",
        "To list random memories.",
      ],
      correct: 2,
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
    router.push("/level/3");
  };

  const handleNextLevel = () => {
    router.push("/level/4");
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
        <h1 className={styles["title"]}>Quiz: Narrative Essay</h1>
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
            <p>You have completed Level 3!</p>
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
                Go to Level 4
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
