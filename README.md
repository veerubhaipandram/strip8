Project Description

This is a full-stack e-commerce platform with integrated Stripe Checkout for processing payments in Indian Rupees (INR). The frontend is built with React, enabling users to view products, add them to a cart, and securely pay via Stripe. The backend, built with Node.js and Express, handles session creation, order persistence, and webhook-based status updates. MongoDB is used to store order data.

Features

Browse products and add them to the cart

View cart with real-time totals

Checkout using Stripe in INR

Stripe-hosted checkout page (secure and PCI-compliant)

Store order details in MongoDB

Handle Stripe webhooks for payment confirmation

Virtual property to get amountInRupees in database

Modular and scalable codebase



---


Technologies Used

Frontend: React, Axios

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Payments: Stripe Checkout (INR), webhooks.




---

README.md

# Stripe-Powered E-Commerce App (INR Payments)

This is a full-stack e-commerce app with Stripe Checkout integration in Indian Rupees (₹). Built with React, Node.js, and MongoDB, it lets users browse items, add to cart, and pay securely via Stripe. Orders are persisted in MongoDB, and Stripe webhooks ensure payment status tracking.

---

## Features

- Add-to-cart and checkout flow
- Stripe-hosted payment page (INR)
- Secure order storage in MongoDB
- Webhook to update payment status
- Responsive UI (React)

---

## Prerequisites

- Node.js v18+
- MongoDB (Atlas)
- Stripe account (Test mode API keys)
- Yarn or npm

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/ankki457/checkout_with_stripe_app.git
cd checkout_with_stripe_app

2. Setup .env file

Create a .env file in the root of /server:

PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET=sk_test_...
CLIENT_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=whsec_...

> Note: You’ll get STRIPE_SECRET_KEY and WEBHOOK_SECRET from your Stripe dashboard.



3. Install dependencies

# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install


---

Running the App

1. Start MongoDB

If using local MongoDB:

mongod

2. Run Backend

cd server
npm start

3. Run Frontend

cd client
npm start

The app will open at http://localhost:3000.


---

Webhook Setup

To handle Stripe webhook events locally, use the Stripe CLI:

stripe login
stripe listen --forward-to localhost:5000/webhook

Copy the webhook secret from Stripe CLI output and paste it into your .env as STRIPE_WEBHOOK_SECRET.



---

Example Order Data (MongoDB)

{
  "email": "user@example.com",
  "amount": 58500,
  "currency": "inr",
  "items": [
    { "productId": "1", "name": "Adidas", "price": 3500, "quantity": 1 }
  ],
  "status": "PENDING",
  "amountInRupees": "5850.00"
}

```

Here is ScreenShoot - 

![2025-05-19_16h36_21](https://github.com/user-attachments/assets/db1b8746-b695-4050-bcdb-fa22e73e45d1)
![2025-05-19_16h36_58](https://github.com/user-attachments/assets/82e3e48b-27fd-4ea6-abdf-f3e1eedbffb5)
![2025-05-19_16h37_19](https://github.com/user-attachments/assets/803f1708-dcd8-475a-9135-dd8d3e879967)
![2025-05-19_16h38_04](https://github.com/user-attachments/assets/93986764-f800-45c2-b2a5-16e8eca0f802)
![2025-05-19_16h41_39](https://github.com/user-attachments/assets/0fd65015-a180-461e-8dce-cd81f1d9cd27)
![2025-05-19_16h41_21](https://github.com/user-attachments/assets/019e1b51-85c8-4758-82f3-c9d3a19d6b94)
