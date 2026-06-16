import mongoose from 'mongoose';

const DEFAULT_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDB(uri?: string) {
  const connUri = uri || process.env.MONGO_URI || DEFAULT_URI;
  await mongoose.connect(connUri);
  console.log(`Connected to MongoDB at ${connUri}`);
}

export async function disconnectDB() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

export default { connectDB, disconnectDB };
