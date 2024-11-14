import { firestore } from '../../../lib/firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, completed_level } = req.body;

    if (!user_id || completed_level === undefined) {
      return res.status(400).json({ error: 'Missing user_id or completed_level in request body.' });
    }

    try {
      const userDocRef = doc(firestore, 'users', user_id);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        // Buat dokumen baru jika tidak ada
        const progress = {
          [`level_${completed_level}`]: true,
          [`level_${completed_level + 1}`]: true,
        };

        console.log('Creating new progress:', progress);
        await setDoc(userDocRef, { progress });

        return res.status(201).json({
          message: 'User progress created successfully.',
          progress,
        });
      } else {
        // Update progress yang sudah ada
        const userProgress = userSnapshot.data()?.progress || {};

        console.log('Current progress before update:', userProgress);

        // Update level yang selesai
        userProgress[`level_${completed_level}`] = true;

        // Buka level berikutnya
        if (completed_level < 6) {
          userProgress[`level_${completed_level + 1}`] = true;
        }

        console.log('Updated progress:', userProgress);
        await updateDoc(userDocRef, { progress: userProgress });

        return res.status(200).json({
          message: 'User progress updated successfully.',
          progress: userProgress,
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      return res.status(500).json({ error: 'Failed to update progress.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}