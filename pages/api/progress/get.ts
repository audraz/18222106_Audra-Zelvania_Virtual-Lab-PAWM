import { firestore } from "../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    try {
      const userDocRef = doc(firestore, "users", user_id as string);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return res.status(404).json({ error: "User not found" });
      }

      const userProgress = userSnapshot.data()?.progress || {};
      res.status(200).json({ progress: userProgress });
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to retrieve progress" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      error: `Method ${req.method} not allowed. Use GET instead.`,
    });
  }
}