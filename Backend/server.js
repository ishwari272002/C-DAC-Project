// server.js
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./admin/admin'); // Import admin routes
const customerRoutes = require('./Customer/customer'); // Import customer routes
const providerRoutes = require('./Provider/provider'); // Import provider routes
const agentRoutes = require('./Agent/agent'); // Import agent routes
const menuRoutes = require('./Provider/menu'); // Import menu routes
const orderRoutes = require('./Customer/orders'); // Import order routes
const feedbackRoutes = require('./Common/feedback'); // Import feedback routes
const itemRoutes = require('./Provider/item'); // Import item routes
const deliveryRoutes = require('./Common/delivery'); // Import delivery routes
const subscriptionRoutes = require('./Customer/subscription'); // Import subscription routes
const paymentRoutes = require('./Common/payment'); // Import payment routes
const loginRoutes = require('./login');

const app = express();
const port = 3000; // You can change this to any port you prefer

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors());

// Use the admin, customer, provider, agent, menu, order, feedback, item, delivery, subscription, and payment routes
app.use('/admin', adminRoutes); // Admin routes will be prefixed with /admin
app.use('/customer', customerRoutes); // Customer routes will be prefixed with /customer
app.use('/provider', providerRoutes); // Provider routes will be prefixed with /provider
app.use('/agent', agentRoutes); // Agent routes will be prefixed with /agent
app.use('/menu', menuRoutes); // Menu routes will be prefixed with /menu
app.use('/orders', orderRoutes); // Order routes will be prefixed with /orders
app.use('/feedback', feedbackRoutes); // Feedback routes will be prefixed with /feedback
app.use('/item', itemRoutes); // Item routes will be prefixed with /item
app.use('/delivery', deliveryRoutes); // Delivery routes will be prefixed with /delivery
app.use('/subscription', subscriptionRoutes); // Subscription routes will be prefixed with /subscription
app.use('/payment', paymentRoutes); // Payment routes will be prefixed with /payment
app.use('/login', loginRoutes); 

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});