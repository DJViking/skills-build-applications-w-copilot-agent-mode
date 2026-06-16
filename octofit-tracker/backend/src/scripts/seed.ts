/*
 Seed the octofit_db database with test data
*/
import User from '../models/User';
import Team from '../models/Team';
import Workout from '../models/Workout';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import { connectDB, disconnectDB } from '../database';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await connectDB();

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  // Create users
  const users = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com' },
    { name: 'Bob Biker', email: 'bob@example.com' },
    { name: 'Carol Climber', email: 'carol@example.com' }
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Team Alpha', members: [users[0]._id, users[1]._id] });
  const teamB = await Team.create({ name: 'Team Beta', members: [users[2]._id] });

  // Create workouts
  const workouts = await Workout.create([
    { name: '5K Run', description: 'Easy paced 5 kilometer run', durationMinutes: 30, caloriesBurn: 300 },
    { name: 'HIIT Session', description: 'High intensity interval training', durationMinutes: 25, caloriesBurn: 350 },
    { name: 'Cycling 20km', description: 'Road cycling', durationMinutes: 60, caloriesBurn: 600 }
  ]);

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, workout: workouts[0]._id, team: teamA._id, durationMinutes: 28, distanceKm: 5, calories: 290 },
    { user: users[1]._id, workout: workouts[2]._id, team: teamA._id, durationMinutes: 62, distanceKm: 20, calories: 610 },
    { user: users[2]._id, workout: workouts[1]._id, team: teamB._id, durationMinutes: 24, calories: 340 }
  ]);

  // Create leaderboard entries
  await Leaderboard.create([
    { user: users[1]._id, team: teamA._id, score: 960, period: 'weekly' },
    { user: users[0]._id, team: teamA._id, score: 290, period: 'weekly' },
    { user: users[2]._id, team: teamB._id, score: 340, period: 'weekly' }
  ]);

  console.log('Seed complete. Created:', {
    users: users.length,
    teams: 2,
    workouts: workouts.length,
    activities: activities.length
  });

  await disconnectDB();
}

seed().catch(err => {
  console.error('Seed failed', err);
  process.exit(1);
});
