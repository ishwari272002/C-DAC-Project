const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const adminRoutes = require("./admin/admin");
const customerRoutes = require("./Customer/customer");
const providerRoutes = require("./Provider/provider");
const agentRoutes = require("./Agent/agent");
const menuRoutes = require("./Provider/menu");
const orderRoutes = require("./Customer/orders");
const feedbackRoutes = require("./Common/feedback");
const itemRoutes = require("./Provider/item");
const deliveryRoutes = require("./Common/delivery");
const subscriptionRoutes = require("./Customer/subscription");
const paymentRoutes = require("./Common/payment");
const loginRoutes = require("./login");
const uploadRoutes = require("./upload"); // Import the upload routes

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Use all routes
app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/agent", agentRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/item", itemRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/payment", paymentRoutes);
app.use("/login", loginRoutes);
app.use("/upload", uploadRoutes); // Add upload routes

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});