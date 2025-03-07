const express = require('express');
const session = require('express-session');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const donorRoutes = require('./routes/donor');
const volunteerRoutes = require('./routes/volunteer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
app.use('/api', apiRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/volunteer', volunteerRoutes);

// Serve static files (assuming your frontend is in a 'public' directory)
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
