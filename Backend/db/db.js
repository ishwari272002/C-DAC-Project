// db.js
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'W2_86850_Yash', // Your database user
    password: 'manager', // Your database password
    database: 'project' // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;