import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Fungsi untuk sign-up
export const signUp = async (email: string, password: string, name: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set displayName setelah pendaftaran
    await firebaseUpdateProfile(user, { displayName: name });

    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during sign-up.";
    throw new Error(errorMessage);
  }
};

// Fungsi untuk login
export const logIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during login.";
    throw new Error(errorMessage);
  }
};

// Fungsi untuk memperbarui nama pengguna
export const updateUserName = async (name: string): Promise<string> => {
  const user = auth.currentUser;
  if (user) {
    try {
      await firebaseUpdateProfile(user, { displayName: name });
      return "Name updated successfully";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during name update.";
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No user is logged in.");
  }
};

// Fungsi untuk memperbarui email pengguna
export const updateUserEmail = async (email: string): Promise<string> => {
  const user = auth.currentUser;
  if (user) {
    try {
      await firebaseUpdateEmail(user, email);
      return "Email updated successfully";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during email update.";
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No user is logged in.");
  }
};

// Fungsi untuk memperbarui password pengguna
export const updateUserPassword = async (password: string): Promise<string> => {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const user = auth.currentUser;
  if (user) {
    try {
      await firebaseUpdatePassword(user, password);
      return "Password updated successfully";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during password update.";
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No user is logged in.");
  }
};