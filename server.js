const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
connectDB();

// ✅ Define CORS properly — allow deployed frontend & local testing
const allowedOrigins = [
  'https://codenovasolutions8.netlify.app',
  'http://127.0.0.1:5500'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// ✅ Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight

// ✅ JSON parsing
app.use(express.json());

// ✅ API routes
app.use('/api/auth', authRoutes);

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
