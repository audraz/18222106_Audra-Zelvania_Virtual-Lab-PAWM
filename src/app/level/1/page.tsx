"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level1.module.css";

const Level1Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/1/quiz"); 
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
      </div>

      {/* Video Section */}
      <div className={styles["video-container"]}>
        <iframe
          width="100%"
          height="415"
          src="https://www.youtube.com/embed/UuOWNNvupik?si=pgYJ4sQ0GYcgIi66"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Introduction to Essay</h1>
        <p className={styles["summary"]}>
        This video is the first part of a crash course on essay writing, aimed at helping viewers master academic essay techniques. An essay consists of three main stages: preparation, writing, and revision. In the preparation stage, viewers need to understand the assignment, choose a topic, and create an initial thesis. The writing stage starts with an introduction, where the writer should grab the reader’s attention, provide context, and state the thesis. The body section contains arguments supporting the thesis, divided into paragraphs with each paragraph focusing on a single main idea, backed by evidence. In the final paragraph, the conclusion, viewers should summarize their main arguments and emphasize the importance of their viewpoint. The last stage, revision, includes checking grammar, structure, and using a plagiarism checker if sources are cited.
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

export default Level1Page;
