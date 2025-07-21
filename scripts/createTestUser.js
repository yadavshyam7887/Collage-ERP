require('dotenv').config();
console.log('DEBUG MONGO_URI:', process.env.MONGO_URI); // Add this

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    const hashedPassword = await bcrypt.hash('123456', 10);
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    });
    await testUser.save();
    console.log('✅ Test user created');
    process.exit();
  })
  .catch((err) => {
    console.log('❌ Connection Error:', err);
  });
