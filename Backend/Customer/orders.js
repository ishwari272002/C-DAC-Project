// orders.js
const express = require('express');
const router = express.Router();
const db = require('../Common/db'); // Import the common database connection

// Create a new order
router.post('/', (req, res) => {
    const { customer_id, order_date, status, delivery_lat, delivery_long, total_amount } = req.body;
    const sql = 'INSERT INTO orders (customer_id, order_date, status, delivery_lat, delivery_long, total_amount) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [customer_id, order_date, status, delivery_lat, delivery_long, total_amount], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ order_id: result.insertId, customer_id });
    });
});

// Read all orders
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single order by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM orders WHERE order_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(result[0]);
    });
});

// Update an order
router.put('/:id', (req, res) => {
    const { customer_id, order_date, status, delivery_lat, delivery_long, total_amount } = req.body;
    const sql = 'UPDATE orders SET customer_id = ?, order_date = ?, status = ?, delivery_lat = ?, delivery_long = ?, total_amount = ? WHERE order_id = ?';
    db.query(sql, [customer_id, order_date, status, delivery_lat, delivery_long, total_amount, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order updated successfully' });
    });
});

// Delete an order
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM orders WHERE order_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    });
});

module.exports = router;