"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Quiz6.module.css";
import { auth, firestore } from '../../../../../lib/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
  const [userId, setUserId] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: "What is the purpose of an argumentative essay?",
      options: [
        "To tell a story",
        "To explore unrelated topics",
        "To present and support a viewpoint with arguments and counter-arguments",
        "To write a summary",
      ],
      correct: 3,
    },
    {
      id: 2,
      question: "What is a common structure for a five-paragraph argumentative essay?",
      options: [
        "Introduction, one body paragraph, and a conclusion",
        "Introduction, two body paragraphs, and a conclusion",
        "Introduction, three body paragraphs, and a conclusion",
        "Conclusion, three body paragraphs, and an introduction",
      ],
      correct: 3,
    },
    {
      id: 3,
      question: "What does analyzing the essay question help you determine?",
      options: [
        "The answer to the question",
        "The structure and requirements for the essay",
        "The length of the introduction only",
        "The exact words to use in the essay",
      ],
      correct: 2,
    },
    {
      id: 4,
      question: "Why is it helpful to plan an essay before writing?",
      options: [
        "To reduce the amount of writing needed",
        "To ensure the arguments are organized and coherent",
        "To avoid writing a conclusion",
        "To make the essay shorter",
      ],
      correct: 2,
    },
    {
      id: 5,
      question: "What should each body paragraph begin with?",
      options: [
        "A counter-argument",
        "A concluding statement",
        "A random idea",
        "A topic sentence summarizing the paragraph",
      ],
      correct: 4,
    },
  ];     

  const progressIncrement = 100 / questions.length; 

  const saveQuizProgressToFirestore = async (userId: string) => {
    const progressData = {
      currentQuestion,
      progress,
      answers,
      quizCompleted,
    };

    try {
      const progressRef = doc(firestore, "quizProgress_level6", userId); // Dokumen khusus level 6
      await setDoc(progressRef, progressData);
    } catch (error) {
      console.error("Error saving quiz progress to Firestore:", error);
    }
  };

  const getQuizProgressFromFirestore = async (userId: string) => {
    try {
      const progressRef = doc(firestore, "quizProgress_level6", userId); // Dokumen khusus level 6
      const docSnap = await getDoc(progressRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No quiz progress found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Error getting quiz progress from Firestore:", error);
      return null;
    }
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

    if (userId) saveQuizProgressToFirestore(userId);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      if (!quizCompleted) {
        setProgress((prevProgress) => Math.min(prevProgress + progressIncrement, 100));
      }

      if (userId) saveQuizProgressToFirestore(userId);
    } else {
      setProgress(100); 
      setQuizCompleted(true);
      setShowModal(true);

      if (userId) saveQuizProgressToFirestore(userId);
    }
  };

  const handleFinishQuiz = async () => {
    if (!userId) {
      console.error("No user is logged in!");
      return;
    }

    console.log("Finishing quiz for user:", userId);

    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          completed_level: 6, // Level 6 selesai
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        console.log("Progress updated successfully!");

        setShowModal(true); 
        setQuizCompleted(true);
        setProgress(100);
      } else {
        console.error("Failed to update progress:", data.error);
      }
    } catch (error) {
      console.error("Error finishing quiz:", error);
    }

    saveQuizProgressToFirestore(userId);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);

      if (!quizCompleted) {
        setProgress((prevProgress) => Math.max(prevProgress - progressIncrement, 0));
      }

      if (userId) saveQuizProgressToFirestore(userId);
    }
  };

  const handleBack = () => {
    router.push("/level/6");
  };

  const handleReturnHome = () => {
    router.push("/homepage");
  };

  const resetQuiz = async () => {
    setCurrentQuestion(0);
    setProgress(0);
    setAnswers({});
    setShowModal(false);
    setQuizCompleted(false);

    if (userId) {
      await saveQuizProgressToFirestore(userId); // Reset progress level 6
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
  
        // Load progress dari Firestore
        getQuizProgressFromFirestore(user.uid).then((savedProgress) => {
          if (savedProgress) {
            setAnswers(savedProgress.answers || {});
            setQuizCompleted(savedProgress.quizCompleted || false);

            // Set progress bar langsung ke 100% setiap kali ada saved progress
            setProgress(100);
          } else {
            // Jika tidak ada progress, mulai dari 0
            setProgress(0);
          }
  
          // Mulai dari pertanyaan pertama untuk tampilan awal
          setCurrentQuestion(0);
        });
      } else {
        setUserId(null); // Clear user ID jika tidak terautentikasi
      }
    });
  
    return () => unsubscribe();
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
        <h1 className={styles["title"]}>Quiz: Argumentative Essay</h1>
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
      <Image 
        src="/popup-img.png" 
        alt="Popup Image" 
        width={200} 
        height={200} 
        className={styles["popup-image"]} 
      />
      <h2>Congratulations!</h2>
      <p>Yay, you have completed Level 6!</p>
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