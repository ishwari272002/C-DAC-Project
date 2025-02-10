// admin.js
const express = require('express');
const router = express.Router();
const db = require('../Common/db'); // Import the common database connection

// Create a new admin
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO admin (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ admin_id: result.insertId, username });
    });
});

// Read all admins
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM admin';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single admin by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM admin WHERE admin_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(result[0]);
    });
});

// Update an admin
router.put('/:id', (req, res) => {
    const { username, password } = req.body;
    const sql = 'UPDATE admin SET username = ?, password = ? WHERE admin_id = ?';
    db.query(sql, [username, password, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin updated successfully' });
    });
});

// Delete an admin
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM admin WHERE admin_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    });
});

module.exports = router;