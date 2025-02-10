// menu.js
const express = require('express');
const router = express.Router();
const db = require('../Common/db'); // Import the common database connection

// Create a new menu item
router.post('/', (req, res) => {
    const { provider_id, item_name, price, is_available } = req.body;
    const sql = 'INSERT INTO menu (provider_id, item_name, price, is_available) VALUES (?, ?, ?, ?)';
    db.query(sql, [provider_id, item_name, price, is_available], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ menu_id: result.insertId, item_name });
    });
});

// Read all menu items
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single menu item by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM menu WHERE menu_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(result[0]);
    });
});

// Update a menu item
router.put('/:id', (req, res) => {
    const { provider_id, item_name, price, is_available } = req.body;
    const sql = 'UPDATE menu SET provider_id = ?, item_name = ?, price = ?, is_available = ? WHERE menu_id = ?';
    db.query(sql, [provider_id, item_name, price, is_available, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item updated successfully' });
    });
});

// Delete a menu item
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM menu WHERE menu_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    });
});

module.exports = router;