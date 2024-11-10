"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level6.module.css";

const Level6Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/6/quiz"); 
    }
  };

  const handleBack = () => {
    router.push("/homepage");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <button onClick={handleBack} className={styles["back-button"]}>
          <Image
            src="/x.png" 
            alt="Back"
            width={24} 
            height={24} 
          />
        </button>
        <div className={styles["progress-bar-container"]}>
          <div
            className={styles["progress-bar"]}
            style={{ width: `${progress}%` }} 
          ></div>
        </div>
      </div>

      {/* Video Section */}
      <div className={styles["video-container"]}>
      <iframe width="100%" height="415" src="https://www.youtube.com/embed/oAUKxr946SI?si=numvjT-WkmzSN_tm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Argumentative Essay</h1>
        <p className={styles["summary"]}>
        This video provides a step-by-step guide to writing a five-paragraph argumentative essay, commonly structured with two arguments supporting the writer's opinion and one counter-argument. Known as the "hamburger essay," this format includes an introduction, three body paragraphs, and a conclusion. To begin, it's essential to analyze the essay question for clues that will help shape the response, identifying the subject, purpose, and any required structure, such as word count. Planning is crucial for effective organization. Various planning methods, like spider diagrams, can help generate ideas. To create strong body paragraphs, choose the main points that best support the opinion, each beginning with a clear topic sentence. The counterpoint in one paragraph acknowledges an opposing view, enhancing the argument. The video emphasizes simplicity in layout, analysis, and planning to ensure clarity and organization.
        </p>
      </div>

      {/* Next Button */}
      <div className={styles["next-container"]}>
        <button onClick={handleNext} className={styles["next-button"]}>
          {progress < 100 ? "Complete Video" : "Start Quiz"}
        </button>
      </div>
    </div>
  );
};

export default Level6Page;
