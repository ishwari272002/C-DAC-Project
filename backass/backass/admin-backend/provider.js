// provider.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the common database connection

// Create a new provider
router.post('/', (req, res) => {
    const { name, address, phone, email } = req.body;
    const sql = 'INSERT INTO provider (name, address, phone, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, phone, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ provider_id: result.insertId, name });
    });
});

// Read all providers
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM provider';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single provider by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM provider WHERE provider_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        res.json(result[0]);
    });
});

// Update a provider
router.put('/:id', (req, res) => {
    const { name, address, phone, email } = req.body;
    const sql = 'UPDATE provider SET name = ?, address = ?, phone = ?, email = ? WHERE provider_id = ?';
    db.query(sql, [name, address, phone, email, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        res.json({ message: 'Provider updated successfully' });
    });
});

// Delete a provider
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM provider WHERE provider_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        res.json({ message: 'Provider deleted successfully' });
    });
});

module.exports = router;