import { Router } from 'express';
import { getWorkouts } from '../controllers/workoutController';

const router = Router();
router.get('/', getWorkouts);
export default router;
