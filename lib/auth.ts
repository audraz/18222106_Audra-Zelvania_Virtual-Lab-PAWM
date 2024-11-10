import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Fungsi untuk sign-up
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during sign-up.";
    throw new Error(errorMessage);
  }
};

// Fungsi untuk login
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during login.";
    throw new Error(errorMessage);
  }
};
