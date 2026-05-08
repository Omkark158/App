require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./db');
const { authLimiter, apiLimiter } = require('./middleware');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', apiLimiter, taskRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));