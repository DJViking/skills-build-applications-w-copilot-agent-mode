import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import workoutRoutes from './routes/workoutRoutes';
import activityRoutes from './routes/activityRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
