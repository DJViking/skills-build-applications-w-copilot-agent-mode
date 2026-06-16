import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  calories: { type: Number },
  recordedAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
