require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to 3W Backend API' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
