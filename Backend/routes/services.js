const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET ALL SERVICES
router.get('/', (req, res) => {
    pool.query('SELECT * FROM services', (err, rows) => {
        if (err) {
            console.error('Error fetching services:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// CREATE NEW SERVICE
router.post('/', (req, res) => {
    const { name, description, price, duration } = req.body;

    pool.query(
        'INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)',
        [name, description, price, duration],
        (err, result) => {
            if (err) {
                console.error('Error creating service:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({
                serviceid: result.insertId,
                name,
                description,
                price,
                duration
            });
        }
    );
});

// UPDATE SERVICE
router.put('/:serviceid', (req, res) => {
    const { serviceid } = req.params;
    const { name, description, price, duration } = req.body;

    pool.query(
        'UPDATE services SET name = ?, description = ?, price = ?, duration = ? WHERE serviceid = ?',
        [name, description, price, duration, serviceid],
        (err, result) => {
            if (err) {
                console.error('Error updating service:', err);
                return res.status(500).json({ error: 'Database error' });
            } else if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Service not found' });
            } else {
                res.status(200).json({
                    serviceid,
                    name,
                    description,
                    price,
                    duration
                });
            }
        }
    );
});

// DELETE SERVICE
router.delete('/:serviceid', (req, res) => {
    const { serviceid } = req.params;

    pool.query('DELETE FROM services WHERE serviceid = ?', [serviceid], (err, result) => {
        if (err) {
            console.error('Error deleting service:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    });
});

module.exports = router;