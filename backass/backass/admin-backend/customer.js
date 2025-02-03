// customer.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the common database connection

// Create a new customer
router.post('/', (req, res) => {
    const { name, email, password, address, phone, location_lat, location_long } = req.body;
    const sql = 'INSERT INTO customer (name, email, password, address, phone, location_lat, location_long) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, password, address, phone, location_lat, location_long], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ customer_id: result.insertId, name });
    });
});

// Read all customers
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single customer by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM customer WHERE customer_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(result[0]);
    });
});

// Update a customer
router.put('/:id', (req, res) => {
    const { name, email, password, address, phone, location_lat, location_long } = req.body;
    const sql = 'UPDATE customer SET name = ?, email = ?, password = ?, address = ?, phone = ?, location_lat = ?, location_long = ? WHERE customer_id = ?';
    db.query(sql, [name, email, password, address, phone, location_lat, location_long, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer updated successfully' });
    });
});

// Delete a customer
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM customer WHERE customer_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    });
});

module.exports = router;