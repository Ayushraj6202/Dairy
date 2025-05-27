import mongoose from 'mongoose';
const mongoDBUrl = process.env.MONGO_DB_URL;
const database = process.env.DATABASE;

// console.log(`${mongoDBUrl}/${database}`);

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoDBUrl}/${database}`, {
      
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error("DB Not Connected " ,err.message);
    process.exit(1);
  }
};

export default connectDB;
