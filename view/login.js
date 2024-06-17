const express=require('express');
const Router=express.Router();

const admin=require('../controller/admin')
const user=require('../controller/user');



Router.post('/adminsignup',admin.admin);
Router.post('/adminlogin',admin.adminlogin);
Router.post('/signup',user.signup);
Router.post('/login',user.login);

module.exports=Router;