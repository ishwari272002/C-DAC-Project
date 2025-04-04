// provider.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection
const { API_BASE_URL } = require('../config');

// Create a new provider
router.post('/register', (req, res) => {
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
router.get("/list", (req, res) => {
    const sql = "SELECT provider_id, name, address, phone, email,  image_url, rating,latitude,longitude FROM provider";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Append full image URLs
        const updatedResults = results.map((provider) => ({
            ...provider,
            image_url: provider.image_url ? `${API_BASE_URL}/uploads/${provider.image_url}` : `${API_BASE_URL}/uploads/default.jpg`,
        }));

        res.json(updatedResults);
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

// Search providers by name
router.post('/search', (req, res) => {
    const searchQuery = req.query.name;
    const sql = 'SELECT * FROM provider WHERE name LIKE ?';
    db.query(sql, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
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