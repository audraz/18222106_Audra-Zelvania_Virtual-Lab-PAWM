"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level4.module.css";

const Level4Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/4/quiz"); 
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
      <iframe width="100%" height="415" src="https://www.youtube.com/embed/1eP5Euwk7GU?si=nErWOBQMgyXCF_NW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Expository Essay</h1>
        <p className={styles["summary"]}>
        This video explains how to write an expository essay, highlighting key differences from argumentative essays. Unlike argumentative essays, which take a stance on an issue, expository essays focus on explaining, clarifying, and providing balanced information about a topic without expressing personal opinions. The expository essay structure includes an introduction, orientation, body, and conclusion. In the introduction, the writer presents the topic and thesis statement without suggesting actions. The orientation paragraph defines terms and concepts, while the body expands on the topic with various paragraph types, such as descriptions, definitions, comparisons, cause and effect, and real-life examples. Body paragraphs in expository essays should avoid opinions and judgments, providing factual analysis instead. Finally, the conclusion reiterates the topic's importance, restates the thesis, and reflects on its real-world implications. The video also offers downloadable templates with thesis examples and paragraph starters to assist in structuring an expository essay.
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

export default Level4Page;
