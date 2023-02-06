import mongoose from 'mongoose';

const { DB_ID, DB_PW, DB_ADDRESS, DB_DATABASE } = process.env;
const MONGO_URI = `mongodb+srv://${DB_ID}:${DB_PW}@${DB_ADDRESS}/${DB_DATABASE}?authSource=admin`;
const connectDB = async () => {
  return mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      mongoose.set('strictQuery', true);
      console.log('[MongoDB] : Successfully connected to MongoDB');
    })
    .catch((e) => {
      console.error(e);
    });
};

export default connectDB;
