const express = require('express');
const router = express.Router();
const pool = require('../db');


// GET ALL BARBERS

router.get('/', (req, res) => {
    pool.query('SELECT u.userid, b.barberid, b.bio, u.firstname, u.lastname FROM barbers b JOIN users u ON b.userid = u.userid', (err, rows) => {
        if (err) {
            console.error('Error fetching barbers:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// CREATE NEW BARBER

router.post('/', (req, res) => {
    const { userid, bio } = req.body;
  
// Check if barber already exists by userid

    pool.query(
      'SELECT * FROM barbers WHERE userid = ?',
      [userid],
      (err, result) => {
        if (err) {
          console.error('Error checking if barber exists:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (result.length > 0) {

// Barber exists, return existing barber

          return res.status(200).json({
            message: 'Barber already exists.',
            barber: result[0],
          });
        } else {

// Barber doesn't exist, create new barber

          pool.query(
            'INSERT INTO barbers (userid, bio) VALUES (?, ?)',
            [userid, bio],
            (err, result) => {
              if (err) {
                console.error('Error creating barber:', err);
                return res.status(500).json({ error: 'Database error' });
              }
              res.status(201).json({
                barberid: result.insertId,
                userid,
                bio,
              });
            }
          );
        }
      }
    );
  });

// UPDATE BARBERS

router.put('/:barberid', (req, res) => {
    const { barberid } = req.params;
    const { bio } = req.body;
  
    pool.query(
      'UPDATE barbers SET bio = ? WHERE barberid = ?',
      [bio, barberid],
      (err, result) => {
        if (err) {
          console.error('Error updating barber:', err);
          res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Barber not found' });
        } else {
          res.status(200).json({
            barberid,
            bio
          });
        }
      }
    );
  });

//DELETE A BARBER

router.delete('/:barberid', (req, res) => {
    const { barberid } = req.params;
    pool.query('DELETE FROM barbers WHERE barberid = ?', [barberid], (err, result) => {
        if (err) {
            console.error('Error deleting barber:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Barber not found' });
        }

        res.json({ message: 'Barber deleted successfully' });
    });
});

module.exports = router;



// customerid, firstname, lastname, email, phonenumber