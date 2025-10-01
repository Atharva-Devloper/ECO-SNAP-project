const mongoose = require('mongoose');
// Resolve connection URI from env, supporting both MONGODB_URI and MONGO_URI, with a local fallback
const resolveMongoUri = () => {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/ecosnap'
  );
};

const connectDB = async () => {
  const uri = resolveMongoUri();
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected');
});

// Handle process termination gracefully
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
