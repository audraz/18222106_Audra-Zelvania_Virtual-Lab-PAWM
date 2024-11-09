"use client";

import styles from './Login.module.css';
import { useRouter } from 'next/navigation';
import { Source_Sans_3 } from 'next/font/google';

// Inisialisasi font di luar komponen
const sourceSans3 = Source_Sans_3({ weight: ['400', '700'], subsets: ['latin'] });

export default function Login() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    router.push('/homepage');
  };

  return (
    <div className={`${styles.container} ${sourceSans3.className}`}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome Back</h1>
        <p className={styles.welcomeMessage}>We're glad to see you again! Please log in to continue.</p>
      </div>

      <div className={styles.signupSection}>
        <h1>Log In</h1>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />

            <button type="submit" className={styles.button} onClick={handleLogin}>Log In</button>
          </form>
          <p className={styles.signupPrompt}>
            Don't have an account?{" "}
            <span className={styles.signupLink} onClick={() => router.push('/signup')}>
              Sign up here
            </span>
          </p>
        </main>
      </div>
    </div>
  );
}
