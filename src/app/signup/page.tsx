"use client";

import { useRouter } from "next/navigation";
import { Source_Sans_3, Yeseva_One } from "next/font/google";
import { signUp } from "../../../lib/auth"; // Pastikan path ini sesuai dengan lokasi file auth.ts Anda
import styles from "./Signup.module.css";

// Inisialisasi font
const sourceSans3 = Source_Sans_3({ weight: ["400", "700"], subsets: ["latin"] });
const yesevaOne = Yeseva_One({ weight: "400", subsets: ["latin"] });

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement)?.value.trim();
    const email = (document.getElementById("email") as HTMLInputElement)?.value.trim();
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;

    // Validasi input
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Panggil fungsi signup dari backend
      await signUp(email, password, name);
      alert("Signup successful! Redirecting to homepage...");
      router.push("/homepage");
    } catch (error) {
      // Tangani error
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during sign-up.";
      alert(errorMessage);
    }
  };

  return (
    <div className={`${styles.container} ${sourceSans3.className}`}>
      <div className={styles.welcomeSection}>
        <h1 className={`${styles.welcomeTitle} ${yesevaOne.className}`}>Welcome to EssLab!</h1>
        <p className={styles.welcomeMessage}>
          Unlock the power of words with EssLab. Join us today to start your journey in mastering the art of essay
          writing!
        </p>
      </div>
      <div className={styles.signupSection}>
        <header className={styles.header}>
          <h1>Get Started</h1>
        </header>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleSignup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required placeholder="Your Name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="Your Email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="Your Password" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required placeholder="Confirm Your Password" />

            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
          <p className={styles.loginPrompt}>
            Already have an account?{" "}
            <span className={styles.loginLink} onClick={() => router.push("/login")}>
              Log In
            </span>
          </p>
        </main>
      </div>
    </div>
  );
}
