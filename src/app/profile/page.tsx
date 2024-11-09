"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import styles from "./Profile.module.css";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan URL saat ini
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Simulasikan penyimpanan pengaturan
    console.log("Saved Profile:", { name, email, password });
    alert("Profile updated successfully!");
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

      {/* Profile Form */}
      <div className={styles["profile-container"]}>
        <h1 className={styles["title"]}>Settings</h1>
        <form className={styles["form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["label"]}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles["input"]}
              placeholder="User"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["label"]}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["input"]}
              placeholder="user@mail.com"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles["label"]}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["input"]}
              placeholder="*******"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className={styles["save-button"]}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
