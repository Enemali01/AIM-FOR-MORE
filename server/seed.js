import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel} from './src/model/userModel.js'

dotenv.config();

// Seed data
const users = [
  {
    email: 'admin@example.com',
    firstname: 'Admin',
    lastname: 'User',
    phone: 1234567890,
    password: 'adminpass',
    role: 'admin'
  },
  {
    email: 'user1@example.com',
    firstname: 'John',
    lastname: 'Doe',
    phone: 1112223333,
    password: 'userpass',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to DB. Seeding data...');

    await UserModel.deleteMany(); // Optional: wipe users before seeding
    await UserModel.insertMany(users);

    console.log('Seeding successful!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
