"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import styles from './Homepage.module.css';
import Image from 'next/image';
import { Italiana } from 'next/font/google';

const italiana = Italiana({ weight: '400', subsets: ['latin'] });

const levels = [
  { level: 1, title: "Introduction to Essay", unlocked: true },
  { level: 2, title: "Descriptive Essay", unlocked: false },
  { level: 3, title: "Narrative Essay", unlocked: false },
  { level: 4, title: "Expository Essay", unlocked: false },
  { level: 5, title: "Persuasive Essay", unlocked: false },
  { level: 6, title: "Argumentative Essay", unlocked: false },
];

const HomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Level yang terbuka

  const handleLevelClick = (level: number) => {
    if (unlockedLevels.includes(level)) {
      router.push(`/level/${level}`); // Redirect ke halaman level
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
            onClick={() => router.push('/homepage')}
            className={`${styles["nav-button"]} ${
              pathname === '/homepage' ? styles["nav-button-active"] : ''
            }`}
          >
            <Image src="/home.png" alt="Home" width={19} height={19} className={styles["icon"]} />
            Home
          </button>
          <button
            onClick={() => router.push('/profile')}
            className={`${styles["nav-button"]} ${
              pathname === '/profile' ? styles["nav-button-active"] : ''
            }`}
          >
            <Image src="/profile.png" alt="Profile" width={14} height={14} className={styles["icon"]} />
            Profile
          </button>
        </nav>
        <div className={styles["menu"]}>
          <button onClick={() => setMenuOpen(!menuOpen)} className={styles["menu-button"]}>
            <FaBars />
          </button>
          {menuOpen && (
            <div className={styles["menu-dropdown"]}>
              <button onClick={() => router.push('/')} className={styles["menu-item"]}>
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
          <h2 className={`${italiana.className}`}>Welcome, User!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. 
            In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper.
          </p>
          <button onClick={() => router.push('/get-started')} className={styles["get-started-button"]}>
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
