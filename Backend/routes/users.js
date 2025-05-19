const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// GET ALL USERS
router.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// CREATE NEW USER
router.post('/', async (req, res) => {
    const { firstname, lastname, email, password, phonenumber, role } = req.body;

    // Check if user already exists by email or phonenumber
    pool.query(
        'SELECT * FROM users WHERE email = ? OR phonenumber = ?',
        [email, phonenumber],
        async (err, result) => {
            if (err) {
                console.error('Error checking if user exists:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length > 0) {
                // User exists, return a response
                return res.status(200).json({
                    message: 'User already exists.',
                    user: result[0],
                });
            } else {
                // User doesn't exist, create new user
                try {
                    // Hash the password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    pool.query(
                        'INSERT INTO users (firstname, lastname, email, password, phonenumber, role) VALUES (?, ?, ?, ?, ?, ?)',
                        [firstname, lastname, email, hashedPassword, phonenumber, role],
                        (err, result) => {
                            if (err) {
                                console.error('Error creating user:', err);
                                return res.status(500).json({ error: 'Database error' });
                            }
                            res.status(201).json({
                                userid: result.insertId,
                                firstname,
                                lastname,
                                email,
                                phonenumber,
                                role
                            });
                        }
                    );
                } catch (hashError) {
                    console.error('Error hashing password:', hashError);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            }
        }
    );
});

// UPDATE USERS
router.put('/:userid', async (req, res) => {
    const { userid } = req.params;
    const { firstname, lastname, email, password, phonenumber, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            'UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, phonenumber = ?, role = ? WHERE userid = ?',
            [firstname, lastname, email, hashedPassword, phonenumber, role, userid],
            (err, result) => {
                if (err) {
                    console.error('Error updating user:', err);
                    res.status(500).json({ error: 'Database error' });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.status(200).json({
                        message: 'User updated successfully',
                        userid,
                        firstname,
                        lastname,
                        email,
                        phonenumber,
                        role
                    });
                }
            }
        );
    } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE A USER
router.delete('/:userid', (req, res) => {
    const { userid } = req.params;
    pool.query('DELETE FROM users WHERE userid = ?', [userid], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;