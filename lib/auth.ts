import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  User,
} from "firebase/auth";
import { auth, firestore } from "./firebaseConfig"; // Pastikan file ini memiliki konfigurasi Firebase
import { doc, setDoc } from "firebase/firestore";

// Fungsi untuk signup
export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Buat akun pengguna menggunakan Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user) {
      throw new Error("User not created successfully.");
    }

    // Update nama pengguna
    await firebaseUpdateProfile(user, { displayName: name });

    // Tambahkan pengguna ke koleksi Firestore
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, {
      displayName: name,
      email,
      progress: {
        level_1: true, // Level 1 tidak terkunci secara default
        level_2: false,
        level_3: false,
        level_4: false,
        level_5: false,
        level_6: false,
      },
    });

    console.log("User successfully added to Firestore with progress initialized.");
  } catch (error: any) {
    console.error("Error during sign-up:", error.message);
    throw new Error(error.message || "Failed to sign up.");
  }
};

// Fungsi untuk login
export const logIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || "An unknown error occurred during login.";
    console.error("Login Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Fungsi untuk memperbarui nama pengguna
export const updateUserName = async (name: string): Promise<string> => {
  const user = auth.currentUser;
  if (user) {
    try {
      await firebaseUpdateProfile(user, { displayName: name });
      console.log("Name updated successfully.");
      return "Name updated successfully";
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred during name update.";
      console.error("Update Name Error:", errorMessage);
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
      console.log("Email updated successfully.");
      return "Email updated successfully";
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred during email update.";
      console.error("Update Email Error:", errorMessage);
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
      console.log("Password updated successfully.");
      return "Password updated successfully";
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred during password update.";
      console.error("Update Password Error:", errorMessage);
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No user is logged in.");
  }
};
