"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import styles from "./Homepage.module.css";
import Image from "next/image";
import { Italiana } from "next/font/google";
import { auth } from "../../../lib/firebaseConfig";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });

const levels = [
  { level: 1, title: "Introduction to Essay" },
  { level: 2, title: "Descriptive Essay" },
  { level: 3, title: "Narrative Essay" },
  { level: 4, title: "Expository Essay" },
  { level: 5, title: "Persuasive Essay" },
  { level: 6, title: "Argumentative Essay" },
];

const HomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]); // Default: Level 1 terbuka
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Check user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        setUserName(user.displayName);
      } else {
        console.error("No user is logged in or displayName is not set.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProgress = async (userId: string) => {
      try {
        const response = await fetch(`/api/progress/get?user_id=${userId}`);
        const data = await response.json();
  
        console.log("Fetched progress:", data.progress);
  
        if (response.ok) {
          const unlocked = Object.keys(data.progress)
            .filter((key) => data.progress[key]) // Ambil level yang sudah terbuka
            .map((key) => parseInt(key.split("_")[1], 10)); // Ambil angka level
  
          console.log("Unlocked levels:", unlocked);
          setUnlockedLevels(unlocked);
        } else {
          console.error("Error fetching progress:", data.error);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        fetchProgress(user.uid);
      } else {
        console.error("No user is logged in.");
      }
    });
  
    return () => unsubscribe();
  }, []);  

  const handleLevelClick = (level: number) => {
    if (unlockedLevels.includes(level)) {
      router.push(`/level/${level}`);
    }
  };

  return (
    <div className={styles["container"]}>
      {/* Header */}
      <header className={styles["header"]}>
        <div className={styles["logo"]}>
          <Image src="/logo.png" alt="Logo" width={110} height={50} />
        </div>
        <nav className={styles["nav"]}>
          <button
            onClick={() => router.push("/homepage")}
            className={`${styles["nav-button"]} ${
              pathname === "/homepage" ? styles["nav-button-active"] : ""
            }`}
          >
            <Image
              src="/home.png"
              alt="Home"
              width={19}
              height={19}
              className={styles["icon"]}
            />
            Home
          </button>
          <button
            onClick={() => router.push("/profile")}
            className={`${styles["nav-button"]} ${
              pathname === "/profile" ? styles["nav-button-active"] : ""
            }`}
          >
            <Image
              src="/profile.png"
              alt="Profile"
              width={14}
              height={14}
              className={styles["icon"]}
            />
            Profile
          </button>
        </nav>
        <div className={styles["menu"]}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles["menu-button"]}
          >
            <FaBars />
          </button>
          {menuOpen && (
            <div className={styles["menu-dropdown"]}>
              <button
                onClick={() => router.push("/")}
                className={styles["menu-item"]}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={styles["content"]}>
        {/* Welcome Card */}
        <div className={styles["welcome-card"]}>
          <h2 className={`${italiana.className}`}>Welcome, {userName}!</h2>
          <p>
    Discover the art of essay like never before. Whether you're a beginner or looking to refine your writing, you're in the right place!
  </p>
  <p>
    Explore our roadmap of interactive levels, designed to take you step-by-step through different essay styles. Each level is tailored to build your skills and confidence as a writer. Ready to start your journey?
  </p>
          <button
            onClick={() => router.push("/level/1")}
            className={styles["get-started-button"]}
          >
            Get Started
          </button>
        </div>

        {/* Roadmap Levels */}
        <div className={styles["roadmap-path"]}>
          {levels.map((level) => (
            <div className={styles["roadmap-level"]} key={level.level}>
              <button
                onClick={() => handleLevelClick(level.level)}
                className={`${styles["level-circle"]} ${
                  unlockedLevels.includes(level.level) ? "" : styles["locked"]
                }`}
                disabled={!unlockedLevels.includes(level.level)} // Disabled jika level belum terbuka
              >
                {level.level}
              </button>
              <span className={styles["level-title"]}>{level.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;