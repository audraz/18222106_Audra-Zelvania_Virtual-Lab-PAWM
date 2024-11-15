"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level2.module.css";

const Level2Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/2/quiz"); 
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
      <iframe width="100%" height="415" src="https://www.youtube.com/embed/cXwEGwgGeuw?si=jwCasitBY0W7E545" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Descriptive Essay</h1>
        <p className={styles["summary"]}>
        This presentation explains how to write descriptive text, which aims to create a vivid picture in the reader's mind by describing a person, place, thing, or event. Descriptive writing engages the five senses (sight, sound, taste, smell, touch) to make the reader feel as if they are part of the scene. The video highlights three techniques: sensory details, "show, don’t tell," and figurative language. Sensory details bring writing to life by making descriptions more vivid. "Show, don’t tell" encourages showing actions and feelings rather than simply stating them. Figurative language, such as similes and metaphors, adds creativity by comparing things in memorable ways. The steps for writing a descriptive essay include choosing a topic, brainstorming ideas using the five senses, creating an engaging introduction, using organized and detailed body paragraphs, and finishing with a conclusion that ties everything together. The process ends with editing and sharing the work.
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

export default Level2Page;
