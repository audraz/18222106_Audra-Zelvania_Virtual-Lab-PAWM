import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  User,
} from "firebase/auth";
import { auth, firestore } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Konstanta untuk koleksi Firestore
const COLLECTIONS = {
  USERS: "users",
};

// Progress default untuk pengguna baru
const DEFAULT_PROGRESS = {
  level_1: true, // Level 1 tidak terkunci secara default
  level_2: false,
  level_3: false,
  level_4: false,
  level_5: false,
  level_6: false,
};

// Fungsi untuk signup
export const signUp = async (email: string, password: string, name: string): Promise<User> => {
  if (!email || !password || !name) {
    throw new Error("Email, password, and name are required.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user) {
      throw new Error("User not created successfully.");
    }

    // Update nama pengguna
    await firebaseUpdateProfile(user, { displayName: name });

    // Tambahkan pengguna ke koleksi Firestore
    const userDocRef = doc(firestore, COLLECTIONS.USERS, user.uid);
    await setDoc(userDocRef, {
      displayName: name,
      email,
      progress: DEFAULT_PROGRESS,
    });

    console.log(`User ${user.uid} successfully added to Firestore with progress initialized.`);
    return user;
  } catch (error: any) {
    console.error("Error during sign-up:", error.message);
    throw new Error(error.message || "Failed to sign up.");
  }
};

// Fungsi untuk login
export const logIn = async (email: string, password: string): Promise<User> => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log(`User ${user.uid} logged in successfully.`);
    return user;
  } catch (error: any) {
    console.error("Login Error:", error.message);
    throw new Error(error.message || "An unknown error occurred during login.");
  }
};

// Fungsi untuk memperbarui nama pengguna
export const updateUserName = async (name: string): Promise<string> => {
  if (!name) {
    throw new Error("Name is required.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in.");
  }

  try {
    await firebaseUpdateProfile(user, { displayName: name });
    console.log(`User ${user.uid} name updated successfully.`);
    return "Name updated successfully";
  } catch (error: any) {
    console.error("Update Name Error:", error.message);
    throw new Error(error.message || "Failed to update name.");
  }
};

// Fungsi untuk memperbarui email pengguna
export const updateUserEmail = async (email: string): Promise<string> => {
  if (!email) {
    throw new Error("Email is required.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in.");
  }

  try {
    await firebaseUpdateEmail(user, email);
    console.log(`User ${user.uid} email updated successfully.`);
    return "Email updated successfully";
  } catch (error: any) {
    console.error("Update Email Error:", error.message);
    throw new Error(error.message || "Failed to update email.");
  }
};

// Fungsi untuk memperbarui password pengguna
export const updateUserPassword = async (password: string): Promise<string> => {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is logged in.");
  }

  try {
    await firebaseUpdatePassword(user, password);
    console.log(`User ${user.uid} password updated successfully.`);
    return "Password updated successfully";
  } catch (error: any) {
    console.error("Update Password Error:", error.message);
    throw new Error(error.message || "Failed to update password.");
  }
};