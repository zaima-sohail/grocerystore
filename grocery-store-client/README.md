# 🛒 Grocery Store - MERN Stack E-Commerce

A full-stack Grocery Store web application built with the MERN Stack (MongoDB, Express.js, React, Node.js) using TypeScript.

---

## 🚀 Features

### 👤 User

- User Registration & Login
- JWT Authentication
- Email Verification
- Update Profile
- Browse Products
- Search Products
- Filter by Category
- Product Details
- Product Reviews & Ratings
- Wishlist
- Shopping Cart
- Checkout
- Stripe Payment
- Order History

---

### 👑 Admin

- Admin Login
- Dashboard
- Manage Products
- Manage Categories
- Manage Orders
- Manage Users
- Update Order Status

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Stripe React SDK

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- Cloudinary
- Multer
- Stripe API

---

# 📂 Project Structure

```
grocerystore/
│
├── grocery-store/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── grocery-store-client/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/zaima-sohail/grocerystore.git
```

```
cd grocerystore
```

---

# Backend Setup

```
cd grocery-store
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

STRIPE_SECRET_KEY=your_stripe_secret

CLIENT_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

# Frontend Setup

```
cd grocery-store-client
```

Install packages

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

Run frontend

```bash
npm run dev
```

---

# 📷 Screens

- Home
- Products
- Product Details
- Cart
- Wishlist
- Checkout
- Orders
- Profile
- Admin Dashboard

---

# Payment Gateway

Stripe Test Card

```
Card Number:
4242 4242 4242 4242

Expiry:
Any future date

CVC:
Any 3 digits

ZIP:
Any 5 digits
```

---

# API Features

- Authentication
- Categories
- Products
- Cart
- Wishlist
- Reviews
- Orders
- Stripe Payment

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

Images

- Cloudinary

---

# Author

**Zaima Sohail**

GitHub

https://github.com/zaima-sohail

---

# License

This project is built for educational purposes.
