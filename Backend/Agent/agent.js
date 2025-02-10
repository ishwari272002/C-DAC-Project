// agent.js
const express = require('express');
const router = express.Router();
const db = require('../Common/db'); // Import the common database connection

// Create a new agent
router.post('/register', (req, res) => {
    const { name, email, phone, current_lat, current_long, availability } = req.body;
    const sql = 'INSERT INTO agent (name, email, phone, current_lat, current_long, availability) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, current_lat, current_long, availability], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ agent_id: result.insertId, name });
    });
});

// Read all agents
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM agent';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single agent by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM agent WHERE agent_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json(result[0]);
    });
});

// Update an agent
router.put('/:id', (req, res) => {
    const { name, email, phone, current_lat, current_long, availability } = req.body;
    const sql = 'UPDATE agent SET name = ?, email = ?, phone = ?, current_lat = ?, current_long = ?, availability = ? WHERE agent_id = ?';
    db.query(sql, [name, email, phone, current_lat, current_long, availability, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({ message: 'Agent updated successfully' });
    });
});

// Delete an agent
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM agent WHERE agent_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully' });
    });
});

module.exports = router;