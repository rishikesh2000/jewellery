const express=require('express');
const Router=express.Router();
const upload=require('../middleware/upload')
const jewellery=require('../controller/jewellery');
const middleware=require('../middleware/jwt');

Router.post('/addjewellery',middleware,upload,jewellery.jewellery);
Router.get('/getjewellery',jewellery.getjewellery);
Router.get('/getonejewellery/:Id',jewellery.getOnejewellery);
Router.delete('/deletejewellery/:Id',middleware,jewellery.deleteProduct);
Router.get('/search',jewellery.search);
module.exports=Router;
