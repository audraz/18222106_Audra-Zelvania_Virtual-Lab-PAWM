"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level3.module.css";

const Level3Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/3/quiz"); 
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
      <iframe width="100%" height="415" src="https://www.youtube.com/embed/-Gl6xqC93RQ?si=PRMiYp-cGHSoH3QC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Narrative Essay</h1>
        <p className={styles["summary"]}>
        The presentation introduces the concept of a narration essay, which is also known as a personal experience essay. Narration essays tell a story about a specific event in the writer's life and aim to convey a particular point or lesson to the reader. The narration must be focused, organized, and have a clear purpose that resonates with the audience. Unlike a journal entry, it should follow a structured format with an introduction, thesis statement, body, and conclusion. Topics for narration essays often involve memorable or impactful personal experiences. The speaker explains chronological order (beginning, middle, end) and the use of time-related transition words to help the reader follow the story's flow. Tips for writing narration essays include staying organized, focusing on descriptive language, and using an implied or direct thesis statement to clarify the essay’s purpose.
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

export default Level3Page;
