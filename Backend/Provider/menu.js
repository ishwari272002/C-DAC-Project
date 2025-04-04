// menu.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection
const path = require("path");
const { API_BASE_URL } = require('../config');

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
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// // Read all menu items by Provider ID
// router.get('/list/:id', (req, res) => {
//     const sql = 'SELECT * FROM menu WHERE provider_id = ?';
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ message: 'No menu items found' });
//         }
//         res.json(result); // Return all menu items
//     });
// });
// Read all menu items by Provider ID
router.get("/list/:id", (req, res) => {
    const providerId = Number(req.params.id);
    if (isNaN(providerId)) {
        return res.status(400).json({ error: "Invalid provider ID" });
    }

    const sql = "SELECT menu_id, item_name, price, description, rating, image_url FROM menu WHERE provider_id = ?";
    
    db.query(sql, [providerId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No menu items found" });
        }

        // Append full image URLs
        const updatedResult = result.map((item) => ({
            ...item,
            image_url: item.image_url 
                ? `${API_BASE_URL}/uploads/${item.image_url}` 
                : `${API_BASE_URL}/uploads/default.jpg`,
        }));

        res.json(updatedResult);
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