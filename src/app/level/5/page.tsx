"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Level5.module.css";

const Level5Page = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(50);
      router.push("/level/5/quiz"); 
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
      <iframe width="100%" height="415" src="https://www.youtube.com/embed/1DltMnjPr1k?si=AvXZosN57h75bDcC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      {/* Title and Summary */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Persuasive Essay</h1>
        <p className={styles["summary"]}>
        This video explains how to write a persuasive essay, which is used to express opinions and convince readers to agree with a specific viewpoint. Persuasive writing involves a clear claim, supported by reasons and backed up by evidence. The essay structure includes an introduction, body paragraphs, and a conclusion. In the introduction, the writer presents their claim, supported by the first reason and relevant evidence. Additional body paragraphs offer more reasons and evidence, and an optional counter-argument paragraph can strengthen the argument by addressing opposing views. The conclusion restates the claim, summarizes key reasons, and calls the reader to action. Key steps for writing a persuasive essay include identifying the audience, choosing a topic, stating a clear position, providing reasons, supporting these reasons with evidence, and organizing the writing effectively. Editing and revising are essential before sharing the final draft.
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

export default Level5Page;
