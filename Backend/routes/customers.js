const express = require('express');
const router = express.Router();
const pool = require('../db');


// GET ALL CUSTOMERS

router.get('/', (req, res) => {
    pool.query('SELECT * FROM customers', (err, rows) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// CREATE NEW CUSTOMER

router.post('/', (req, res) => {
    const { firstname, lastname, email, phonenumber } = req.body;
  
// Check if customer already exists by email or phone number

    pool.query(
      'SELECT * FROM customers WHERE email = ? OR phonenumber = ?',
      [email, phonenumber],
      (err, result) => {
        if (err) {
          console.error('Error checking if customer exists:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (result.length > 0) {

// Customer exists, just link to appointment

          return res.status(200).json({
            message: 'Customer already exists, proceed with appointment booking.',
            customer: result[0],
          });
        } else {

// Customer doesn't exist, create new customer

          pool.query(
            'INSERT INTO customers (firstname, lastname, email, phonenumber) VALUES (?, ?, ?, ?)',
            [firstname, lastname, email, phonenumber],
            (err, result) => {
              if (err) {
                console.error('Error creating customer:', err);
                return res.status(500).json({ error: 'Database error' });
              }
              res.status(201).json({
                customerid: result.insertId,
                firstname,
                lastname,
                email,
                phonenumber,
              });
            }
          );
        }
      }
    );
  });

// UPDATE CUSTOMERS 

router.put('/:customerid', (req, res) => {
    const { customerid } = req.params;
    const { firstname, lastname, email, phonenumber } = req.body;
  
    pool.query(
      'UPDATE customers SET firstname = ?, lastname = ?, email = ?, phonenumber = ? WHERE customerid = ?',
      [firstname, lastname, email, phonenumber, customerid],
      (err, result) => {
        if (err) {
          console.error('Error updating customer:', err);
          res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Customer not found' });
        } else {
          res.status(200).json({
            customerid,
            firstname,
            lastname,
            email,
            phonenumber
          });
        }
      }
    );
  });

//DELETE A CUSTOMER

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM customers WHERE customerid = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({ message: 'Customer deleted successfully' });
    });
});

module.exports = router;


// customerid, firstname, lastname, email, phonenumber