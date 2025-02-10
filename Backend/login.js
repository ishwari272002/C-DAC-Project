const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./Common/db'); 
const router = express.Router();


const JWT_SECRET = 'your_jwt_secret_key';

router.post('/', (req, res) => {
    const { username, password } = req.body;

   
    const sql = `
        SELECT 'admin' AS role, admin_id AS id, username, password FROM admin WHERE username = ? AND password = ?
        UNION
        SELECT 'customer' AS role, customer_id AS id, email AS username, password FROM customer WHERE email = ? AND password = ?
    `;

    db.query(sql, [username, password, username, password, username, password, username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0]; 
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    });
});

module.exports = router;