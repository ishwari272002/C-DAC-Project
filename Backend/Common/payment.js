// payment.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection

// Create a new payment
router.post('/', (req, res) => {
    const { order_id, amount, payment_status, payment_date, payment_method } = req.body;
    const sql = 'INSERT INTO payment (order_id, amount, payment_status, payment_date, payment_method) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [order_id, amount, payment_status, payment_date, payment_method], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ payment_id: result.insertId, order_id });
    });
});

// Read all payments
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM payment';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single payment by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM payment WHERE payment_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(result[0]);
    });
});

// Update a payment
router.put('/:id', (req, res) => {
    const { order_id, amount, payment_status, payment_date, payment_method } = req.body;
    const sql = 'UPDATE payment SET order_id = ?, amount = ?, payment_status = ?, payment_date = ?, payment_method = ? WHERE payment_id = ?';
    db.query(sql, [order_id, amount, payment_status, payment_date, payment_method, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment updated successfully' });
    });
});

// Delete a payment
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM payment WHERE payment_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    });
});

module.exports = router;