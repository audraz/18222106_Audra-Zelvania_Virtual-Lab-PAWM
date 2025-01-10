import { firestore } from '../../../lib/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, completed_level } = req.body;

  try {
    console.log("Request received with data:", { user_id, completed_level });

    const userDocRef = doc(firestore, 'users', user_id);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      console.log("Document does not exist for user:", user_id);
      return res.status(404).json({ error: "User document not found." });
    }

    console.log("Document exists. Data:", userSnapshot.data());

    const userProgress = userSnapshot.data()?.progress || {};
    userProgress[`level_${completed_level}`] = true;

    if (completed_level < 6) {
      userProgress[`level_${completed_level + 1}`] = true;
    }

    console.log("Updated progress data:", userProgress);

    await updateDoc(userDocRef, { progress: userProgress });

    return res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error updating progress:", error);
    return res.status(500).json({ error: "Failed to update progress." });
  }
}