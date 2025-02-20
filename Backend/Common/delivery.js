// delivery.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the common database connection

// Get all cities
// delivery.js
router.get('/cities', (req, res) => {
    const sql = 'SELECT * FROM locations'; // or the correct table/logic to fetch cities
    db.query(sql, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows); // This should return an array of cities
    });
  });

// Create a new delivery
router.post('/', (req, res) => {
    const { order_id, agent_id, delivery_status, current_lat, current_long } = req.body;
    const sql = 'INSERT INTO delivery (order_id, agent_id, delivery_status, current_lat, current_long) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [order_id, agent_id, delivery_status, current_lat, current_long], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ delivery_id: result.insertId, order_id, agent_id });
    });
});

// Read all deliveries
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM delivery';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Read a single delivery by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM delivery WHERE delivery_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.json(result[0]);
    });
});

// Update a delivery
router.put('/:id', (req, res) => {
    const { order_id, agent_id, delivery_status, current_lat, current_long } = req.body;
    const sql = 'UPDATE delivery SET order_id = ?, agent_id = ?, delivery_status = ?, current_lat = ?, current_long = ? WHERE delivery_id = ?';
    db.query(sql, [order_id, agent_id, delivery_status, current_lat, current_long, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.json({ message: 'Delivery updated successfully' });
    });
});

// Delete a delivery
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM delivery WHERE delivery_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.json({ message: 'Delivery deleted successfully' });
    });
});

module.exports = router;