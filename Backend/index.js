require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3004;

// Middleware
app.use(express.json());

// Import Routes
const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);

const barberRoutes = require('./routes/barbers');
app.use('/api/barbers', barberRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const serviceRoutes = require('./routes/services');
app.use('/api/services', serviceRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

// Express route for testing the app
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
