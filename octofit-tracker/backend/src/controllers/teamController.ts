import { Request, Response } from 'express';
import Team from '../models/Team';

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};
