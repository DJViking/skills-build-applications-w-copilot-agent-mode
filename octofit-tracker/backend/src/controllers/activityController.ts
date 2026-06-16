import { Request, Response } from 'express';
import Activity from '../models/Activity';

export const getActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user workout team').lean();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
