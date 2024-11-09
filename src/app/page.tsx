// page.tsx
"use client";

import styles from './styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Source_Sans_3 } from 'next/font/google';

// Pindahkan deklarasi font ke luar komponen
const sourceSans3 = Source_Sans_3({ weight: ['400', '700'], subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <div className={`${styles.container} ${sourceSans3.className}`}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="EssLab Logo" width={150} height={50} />
        </div>
        <div className={styles.loginContainer}>
          <button 
            className={styles.button} 
            onClick={() => router.push('/login')}
          >
            Log In
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.about}>
          <Image src="/slogan.png" alt="EssLab Slogan" width={600} height={200} />
          <p>
            EssLab is designed to enhance your essay writing skills through interactive learning modules. 
            Explore different types of essays, understand their structures, and practice writing with guided assistance.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 18222106 EssLab</p>
      </footer>
    </div>
  );
}
