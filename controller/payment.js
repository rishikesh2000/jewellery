const Razorpay = require("razorpay");
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

exports.createPayment = async (req, res) => {
    const { amount } = req.body;
    if (!amount) {
        return res.status(400).json({ message: "Please provide the amount." });
    }

    const options = {
        amount: amount * 100, // amount in paise (1 INR = 100 paise)
        currency: "INR",
        receipt: "order_rcptid_" + Date.now(), // Receipt generated for each transaction
        payment_capture: 1 // Auto capture payment
    };

    try {
        const response = await razorpay.orders.create(options);
        res.status(201).json({
            amount: response.amount,
            currency: response.currency,
            order_id: response.id
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Failed to create order." });
    }
};

exports.verifyPaymentSignature = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const generatedSignature = crypto.createHmac('sha256', process.env.key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (generatedSignature === razorpay_signature) {
        return res.status(200).json({ success: true, message: "Payment signature verified successfully." });
    } else {
        return res.status(400).json({ success: false, message: "Invalid payment signature." });
    }
};
