// item.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection

// ✅ Add an item to an order
router.post('/', (req, res) => {
    const { order_id, item_name, quantity } = req.body;
    const sql = 'INSERT INTO order_items (order_id, item_name, quantity) VALUES (?, ?, ?)';
    
    db.query(sql, [order_id, item_name, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Item added successfully', item_id: result.insertId });
    });
});

// ✅ Get all items
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM order_items';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single item by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM item WHERE item_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(result[0]);
    });
});

// Update an item
router.put('/:id', (req, res) => {
    const { order_id, menu_id, quantity, price } = req.body;
    const sql = 'UPDATE item SET order_id = ?, menu_id = ?, quantity = ?, price = ? WHERE item_id = ?';
    db.query(sql, [order_id, menu_id, quantity, price, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully' });
    });
});

// Delete an item
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM item WHERE item_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
});

module.exports = router;