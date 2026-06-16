import { Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find().populate('user team').sort({ score: -1 }).lean();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
