const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Sync Database models
sequelize.sync()
  .then(() => console.log('Database synced.'))
  .catch(err => console.error('Error syncing database:', err.message));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/actions', require('./routes/actions'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/community', require('./routes/community'));
app.use('/api/resources', require('./routes/resources'));

app.get('/', (req, res) => {
  res.send('Eco News & Action Hub API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
