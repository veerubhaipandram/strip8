require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Mongoose model
const Order = mongoose.model("Order", new mongoose.Schema({
    email: String,
    items: [{
        name: String,
        quantity: Number,
        price: Number,
        image: String
    }],
    amount: Number,
    currency: String,
    customerName: String,
    customerAddress: String,
    stripeSessionId: String,
    paymentIntentId: String,
    status: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' }
}, { timestamps: true }));

// Create Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
    const { products, email, customerName, customerAddress } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.dish,
                images: [product.imgdata]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            billing_address_collection: 'auto',
            customer_email: email,
            metadata: {
                customer_name: customerName,
                customer_address: customerAddress
            }
        });

        // Save pending order in DB
        await Order.create({
            email,
            items: products.map(p => ({
                name: p.dish,
                quantity: p.qnty,
                price: p.price,
                image: p.imgdata
            })),
            amount: lineItems.reduce((acc, item) => acc + item.price_data.unit_amount * item.quantity, 0),
            currency: "inr",
            stripeSessionId: session.id,
            customerName,
            customerAddress,
            status: "PENDING"
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Stripe session error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Stripe webhook to confirm payment
app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        await Order.findOneAndUpdate(
            { stripeSessionId: session.id },
            {
                status: "PAID",
                paymentIntentId: session.payment_intent
            }
        );

        console.log("Order marked as PAID:", session.id);
    }

    res.status(200).json({ received: true });
});

app.listen(7000, () => console.log("Server started on port 7000"));