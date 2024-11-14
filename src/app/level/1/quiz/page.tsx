"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz.module.css";

type Answer = {
  selected: number;
  feedback: string[];
};

const QuizPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showModal, setShowModal] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  const progressIncrement = 100 / questions.length; 

  const saveQuizProgressToLocal = () => {
    const progressData = {
      currentQuestion,
      progress,
      answers,
      quizCompleted,
    };
    localStorage.setItem("quiz_progress_level_1", JSON.stringify(progressData));
  };

  const getQuizProgressFromLocal = () => {
    const data = localStorage.getItem("quiz_progress_level_1");
    return data ? JSON.parse(data) : null;
  };

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

    const updatedAnswers = {
      ...answers,
      [currentQuestion]: { selected: index, feedback: newFeedback },
    };

    setAnswers(updatedAnswers);

    saveQuizProgressToLocal();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      if (!quizCompleted) {
        setProgress((prevProgress) => Math.min(prevProgress + progressIncrement, 100));
      }

      saveQuizProgressToLocal();
    } else {
      setProgress(100); 
      setQuizCompleted(true);
      setShowModal(true);
      saveQuizProgressToLocal();
    }
  };

  const handleFinishQuiz = () => {
    setShowModal(true); 
    setQuizCompleted(true);

    setProgress(100);

    saveQuizProgressToLocal();
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);

      if (!quizCompleted) {
        setProgress((prevProgress) => Math.max(prevProgress - progressIncrement, 0));
      }

      saveQuizProgressToLocal();
    }
  };

  const handleBack = () => {
    router.push("/homepage");
  };

  const handleReturnHome = () => {
    router.push("/homepage");
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setProgress(0);
    setAnswers({});
    setShowModal(false);
    setQuizCompleted(false);

    localStorage.removeItem("quiz_progress_level_1");

    saveQuizProgressToLocal();
  };

  useEffect(() => {
    const savedProgress = getQuizProgressFromLocal();
    if (savedProgress) {
      setAnswers(savedProgress.answers || {});
      setQuizCompleted(savedProgress.quizCompleted || false);

      setCurrentQuestion(0);

      if (savedProgress.quizCompleted) {
        setProgress(100);
        console.log("Quiz completed, progress set to 100%");
      } else {
        setProgress(0); 
      }
    }
  }, []);

  const currentAnswer = answers[currentQuestion] || {};

  return (
    <div className={styles["container"]}>
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
            onClick={
              currentQuestion < questions.length - 1
                ? handleNextQuestion
                : handleFinishQuiz
            }
            className={styles["next-button"]}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Finish Quiz"}
          </button>
        )}
      </div>

      {showModal && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <h2>Congratulations!</h2>
            <p>Yay, you have completed Level 1!</p>
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
                onClick={() => router.push("/level/2")}
                className={styles["next-level-button"]}
              >
                Go to Level 2
              </button>
              <button
                onClick={resetQuiz}
                className={styles["retry-button"]}
              >
                Retry Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;