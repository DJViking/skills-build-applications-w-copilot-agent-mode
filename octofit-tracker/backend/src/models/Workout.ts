import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  caloriesBurn: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
