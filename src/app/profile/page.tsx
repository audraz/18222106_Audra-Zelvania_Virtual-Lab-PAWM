"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../../../lib/firebaseConfig";
import { updateUserName, updateUserEmail, updateUserPassword } from "../../../lib/auth";
import { FaBars } from "react-icons/fa";
import styles from "./Profile.module.css";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // State untuk menyimpan data pengguna
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Ambil data pengguna saat ini ketika halaman dimuat
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName || ""); // Ambil displayName pengguna
        setEmail(user.email || "");     // Ambil email pengguna
      } else {
        console.error("No user is logged in.");
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleSave = async () => {
    try {
      if (name) {
        const nameResult = await updateUserName(name);
        console.log(nameResult);
      }
      if (email) {
        const emailResult = await updateUserEmail(email);
        console.log(emailResult);
      }
      if (password) {
        const passwordResult = await updateUserPassword(password);
        console.log(passwordResult);
        setPassword(""); 
      }
      alert("Profile updated successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      alert(errorMessage);
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
              placeholder="Enter your name"
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
              placeholder="Enter your email"
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
              placeholder="Enter new password"
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
