const express=require('express');
const Router=express.Router();

const payment=require('../controller/payment');

Router.post('/paymentCreate',payment.createOreder);
Router.post('/paymentVerification',payment.verification);

module.exports=Router;