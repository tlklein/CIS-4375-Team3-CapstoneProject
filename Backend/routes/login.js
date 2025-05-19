const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'CIS4375'; // Replace with your actual secret

// LOGIN API
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, userResult) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (userResult.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userResult[0];

        // Debugging information
        console.log('User found:', user);
        console.log('Password from request:', password);
        console.log('Password from database:', user.password);

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password or email.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userID, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
});

// Middleware to check if user is authenticated
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}

// Example route accessible only to admins
router.get('/admin', authenticateToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

// Example route accessible to all authenticated users
router.get('/user', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome, User!' });
});

module.exports = router;