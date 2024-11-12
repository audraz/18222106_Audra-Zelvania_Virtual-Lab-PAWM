"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz4.module.css";

type Answer = {
  selected: number; 
  feedback: string[]; 
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
      question: "What is the main purpose of an expository essay?",
      options: [
        "To express personal opinions on a topic.",
        "To argue for one side of an issue.",
        "To provide a balanced explanation and detailed information about a topic.",
        "To persuade the reader to take action.",
      ],
      correct: 3,
    },
    {
      id: 2,
      question: "Which of the following best describes a thesis statement in an expository essay?",
      options: [
        "It argues one side of a debate.",
        "It expresses personal opinion.",
        "It is objective and uses statements like 'is.'",
        "It suggests what should happen regarding the topic.",
      ],
      correct: 3,
    },
    {
      id: 3,
      question: "Which type of paragraph is not suitable for the body of an expository essay?",
      options: [
        "Description.",
        "Definition.",
        "Problem and solution.",
        "Opinion and personal judgment.",
      ],
      correct: 4,
    },
    {
      id: 4,
      question: "What is included in the introduction of an expository essay?",
      options: [
        "A conclusion and judgment.",
        "An evaluation of the topic.",
        "An explanation of the thesis, topic relevance, and essay structure.",
        "A list of opinions about the topic.",
      ],
      correct: 3,
    },
    {
      id: 5,
      question: "What should be avoided in an expository essay?",
      options: [
        "Providing a balanced, factual explanation.",
        "Using objective language.",
        "Stating opinions or taking a side.",
        "Describing processes.",
      ],
      correct: 3,
    },
  ];

  const calculateScore = () => {
    return Object.keys(answers).reduce((score, questionIndex) => {
      const questionId = parseInt(questionIndex);
      const userAnswer = answers[questionId]?.selected;
      const correctAnswer = questions[questionId].correct - 1;
      return userAnswer === correctAnswer ? score + 1 : score;
    }, 0);
  };

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
    router.push("/level/4");
  };

  const handleNextLevel = () => {
    router.push("/level/5");
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
        <h1 className={styles["title"]}>Quiz: Expository Essay</h1>
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
            <p>You have completed Level 4!</p>
            <p>
              Your score: {calculateScore()} / {questions.length}
            </p>
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
                Go to Level 5
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;