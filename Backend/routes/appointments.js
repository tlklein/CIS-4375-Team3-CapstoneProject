const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET ALL APPOINTMENTS
router.get('/', (req, res) => {
    pool.query('select a.appointmentid, c.FirstName as CustomerFirst, c.LastName as CustomerLast, u.firstname as BarberFirst, u.lastname as BarberLast, s.`name` as Service, starttime, endtime, `status`, c.customerid, s.serviceid, b.barberid from appointments a join barbers b on b.barberid = a.barberid join customers c on c.customerid = a.customerid join services s on s.serviceid = a.serviceid join users u on u.userid = b.userid', (err, rows) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// CREATE NEW APPOINTMENT
router.post('/', (req, res) => {
    const { customerid, barberid, serviceid, starttime, endtime, status } = req.body;

    // Check if customerid exists
    pool.query('SELECT * FROM customers WHERE customerid = ?', [customerid], (err, customerResult) => {
        if (err) {
            console.error('Error checking customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (customerResult.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Check if barberid exists
        pool.query('SELECT * FROM barbers WHERE barberid = ?', [barberid], (err, barberResult) => {
            if (err) {
                console.error('Error checking barber:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (barberResult.length === 0) {
                return res.status(404).json({ error: 'Barber not found' });
            }

            // Create the appointment
            pool.query(
                'INSERT INTO appointments (customerid, barberid, serviceid, starttime, endtime, status) VALUES (?, ?, ?, ?, ?, ?)',
                [customerid, barberid, serviceid, starttime, endtime, status],
                (err, result) => {
                    if (err) {
                        console.error('Error creating appointment:', err);
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.status(201).json({
                        appointmentid: result.insertId,
                        customerid,
                        barberid,
                        serviceid,
                        starttime,
                        endtime,
                        status
                    });
                }
            );
        });
    });
});

// UPDATE APPOINTMENT
router.put('/:appointmentid', (req, res) => {
    const { appointmentid } = req.params;
    const { customerid, barberid, serviceid, starttime, endtime, status } = req.body;

    // Check if customerid exists
    pool.query('SELECT * FROM customers WHERE customerid = ?', [customerid], (err, customerResult) => {
        if (err) {
            console.error('Error checking customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (customerResult.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Check if barberid exists
        pool.query('SELECT * FROM barbers WHERE barberid = ?', [barberid], (err, barberResult) => {
            if (err) {
                console.error('Error checking barber:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (barberResult.length === 0) {
                return res.status(404).json({ error: 'Barber not found' });
            }

            // Update the appointment
            pool.query(
                'UPDATE appointments SET customerid = ?, barberid = ?, serviceid = ?, starttime = ?, endtime = ?, status = ? WHERE appointmentid = ?',
                [customerid, barberid, serviceid, starttime, endtime, status, appointmentid],
                (err, result) => {
                    if (err) {
                        console.error('Error updating appointment:', err);
                        return res.status(500).json({ error: 'Database error' });
                    } else if (result.affectedRows === 0) {
                        return res.status(404).json({ message: 'Appointment not found' });
                    } else {
                        res.status(200).json({
                            appointmentid,
                            customerid,
                            barberid,
                            serviceid,
                            starttime,
                            endtime,
                            status
                        });
                    }
                }
            );
        });
    });
});

// DELETE APPOINTMENT
router.delete('/:appointmentid', (req, res) => {
    const { appointmentid } = req.params;
    pool.query('DELETE FROM appointments WHERE appointmentid = ?', [appointmentid], (err, result) => {
        if (err) {
            console.error('Error deleting appointment:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({ message: 'Appointment deleted successfully' });
    });
});

module.exports = router;