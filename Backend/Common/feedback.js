// feedback.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection

// Create a new feedback entry
router.post('/', (req, res) => {
    const { order_id, rating, comments } = req.body;
    const sql = 'INSERT INTO feedback (order_id, rating, comments) VALUES (?, ?, ?)';
    db.query(sql, [order_id, rating, comments], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ feedback_id: result.insertId, order_id });
    });
});

// Read all feedback entries
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM feedback';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single feedback entry by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM feedback WHERE feedback_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json(result[0]);
    });
});

// Update a feedback entry
router.put('/:id', (req, res) => {
    const { order_id, rating, comments } = req.body;
    const sql = 'UPDATE feedback SET order_id = ?, rating = ?, comments = ? WHERE feedback_id = ?';
    db.query(sql, [order_id, rating, comments, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json({ message: 'Feedback updated successfully' });
    });
});

// Delete a feedback entry
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM feedback WHERE feedback_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted successfully' });
    });
});

module.exports = router;