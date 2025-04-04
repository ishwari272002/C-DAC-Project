// orders.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the common database connection

// ✅ Create a new order with items
router.post('/new', (req, res) => {
    const { customer_id, provider_id, delivery_lat, delivery_long, total_price, payment_status, payment_type, items } = req.body;

    // Insert into Orders table
    const orderSql = 'INSERT INTO orders (customer_id, provider_id, delivery_lat, delivery_long, total_price, payment_status, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(orderSql, [customer_id, provider_id, delivery_lat, delivery_long, total_price, payment_status, payment_type], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const order_id = result.insertId;

        // Insert items into order_items table
        const itemSql = 'INSERT INTO order_items (order_id,items_name, itemquantity) VALUES ?';
        const itemValues = items.map(item => [order_id, item.items_name, item.itemquantity]);

        db.query(itemSql, [itemValues], (err, itemResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Order created successfully', order_id });
        });
    });
});

// ✅ Get all orders with their items
router.get('/', (req, res) => {
    const sql = `
        SELECT o.*, oi.item_name, oi.quantity
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        ORDER BY o.order_id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
// ✅ Get all orders for a specific customer
router.get('/id/:customer_id', (req, res) => {
    const sql = `
        SELECT o.*, oi.items_name, oi.itemquantity
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.customer_id = ?
        ORDER BY o.order_id DESC
    `;
    db.query(sql, [req.params.customer_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No recent orders' });
        }
        res.json(results);
    });
});

// ✅ Get a single order by ID with items
router.get('/:id', (req, res) => {
    const sql = `
        SELECT o.*, oi.item_name, oi.quantity
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.order_id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(results);
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