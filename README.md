# 🍱 TDMS – Tiffin Delivery Management System

TDMS is a cross-platform **Tiffin Delivery Management System** built using **React Native**, **Node.js**, **Express**, and **MySQL**. It enables customers to subscribe to meals, place orders, view menus, and make payments while helping providers manage deliveries efficiently.

---
## 📸 Screenshots
![Demo](assets/screenshots/demo.png)

<p align="center">
  <img src="assets/screenshots/login.png" alt="Login" width="200"/>
  <img src="assets/screenshots/home.png" alt="Home" width="200"/>
  <img src="assets/screenshots/menu.png" alt="Menu" width="200"/>
  <img src="assets/screenshots/orders.png" alt="Orders" width="200"/>
  <img src="assets/screenshots/location.png" alt="Location" width="200"/>
  <img src="assets/screenshots/profile.png" alt="Profile" width="200"/>
  <img src="assets/screenshots/plans.png" alt="Plans" width="200"/>
  <img src="assets/screenshots/cart.png" alt="Cart" width="200"/>
  <img src="assets/screenshots/pay.png" alt="Pay" width="200"/>
  <img src="assets/screenshots/success.png" alt="Success" width="200"/>
</p>

---

## 🚀 Features

### 👤 Customers
- Subscribe to daily/monthly/weekly tiffins
- Choose veg/non-veg thalis, sweets, and mini options
- View daily menus and place orders
- Register complaints and give feedback
- Track delivery status

### 🧑‍🍳 Providers
- Share daily menu and item availability
- Track orders and manage subscriptions

### 🚚 Delivery Agents
- View assigned orders
- Update delivery status

### 🛠 Admin
- Manage users, tiffin providers, and delivery agents
- Monitor feedback and resolve complaints

---

## 🛠 Tech Stack

| Area         | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React Native (Expo)                |
| Backend      | Node.js, Express                   |
| Database     | MySQL                              |
| Auth & API   | JWT, REST APIs                     |
| UI/UX        | React Native Elements / Custom CSS |
| Payments     | Razorpay / Stripe (planned)        |
| Version Ctrl | Git, GitHub                        |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/tdms.git
cd tdms
```

⸻

### 2️⃣ Install Dependencies
```
npm install
# or
yarn install
```

⸻

### 3️⃣ Setup Environment File

Create a .env file in the /backend directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=tdms
```

⸻

### 4️⃣ Run MySQL and Import Schema
- Start MySQL Server

- Import SQL from:
```
/backend/db/schema.sql
```
- You can use tools like phpMyAdmin or MySQL CLI:
```
mysql -u root -p tdms < backend/db/schema.sql
```

⸻

### 5️⃣ Start Backend Server
```
cd backend
npm install
npm start

```
⸻

### 6️⃣ Start Frontend (React Native)
```
cd ../frontend
npx expo start
```
- Scan QR code using the Expo Go app on your phone.
- Ensure both mobile and development PC are on the same network.

---

## 📁 Folder Structure
```
tdms/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── screens/
│   └── App.js
├── assets/
│   └── screenshots/
├── README.md
└── .env
```

---

## 📎 Dependencies

Install major dependencies if needed:
```
npm install express mysql2 dotenv cors nodemon jsonwebtoken bcrypt
npm install react-native react-navigation react-native-elements
npm install axios
```
Use expo install for React Native-specific packages.

---

## 🙌 Author

**Yash Vijay Bharsakle**
- 📧 yashbharsakle451@gmail.com 
- 📱 +91-7558739501 
- 🔗 LinkedIn: https://www.linkedin.com/in/yash-bharsakle451/
- 🌐 Portfolio: https://yash-bharsakle.github.io/Portfolio/

---

⭐️ Show Some Love

If you liked the project, consider leaving a ⭐ on GitHub.

