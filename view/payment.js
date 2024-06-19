const express=require('express');
const Router=express.Router();

const payment=require('../controller/payment');

Router.post('/paymentCreate',payment.createPayment);
Router.post('/paymentVerification',payment.verifyPaymentSignature);

module.exports=Router;