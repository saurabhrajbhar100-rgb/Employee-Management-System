const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/employeeDB');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running and DB is connected!');
});

// Routes
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});