import { Request, Response } from 'express';
import Workout from '../models/Workout';

export const getWorkouts = async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};
