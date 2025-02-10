// subscription.js
const express = require('express');
const router = express.Router();
const db = require('../Common/db'); // Import the common database connection

// Create a new subscription
router.post('/', (req, res) => {
    const { customer_id, subscription_type, start_date, end_date, amount, status } = req.body;
    const sql = 'INSERT INTO subscription (customer_id, subscription_type, start_date, end_date, amount, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [customer_id, subscription_type, start_date, end_date, amount, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ subscription_id: result.insertId, customer_id });
    });
});

// Read all subscriptions
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM subscription';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single subscription by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM subscription WHERE subscription_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.json(result[0]);
    });
});

// Update a subscription
router.put('/:id', (req, res) => {
    const { customer_id, subscription_type, start_date, end_date, amount, status } = req.body;
    const sql = 'UPDATE subscription SET customer_id = ?, subscription_type = ?, start_date = ?, end_date = ?, amount = ?, status = ? WHERE subscription_id = ?';
    db.query(sql, [customer_id, subscription_type, start_date, end_date, amount, status, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.json({ message: 'Subscription updated successfully' });
    });
});

// Delete a subscription
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM subscription WHERE subscription_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.json({ message: 'Subscription deleted successfully' });
    });
});

module.exports = router;