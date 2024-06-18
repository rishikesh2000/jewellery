const express=require('express');
const Router=express.Router();
const upload=require('../middleware/upload')
const jewllery=require('../controller/jewllery');
const middleware=require('../middleware/jwt');

Router.post('/addjewllery',middleware,upload,jewllery.jewllery);
Router.get('/getjewllery',jewllery.getjewllery);
Router.get('/getonejewllery/:Id',jewllery.getOnejewllery);
Router.delete('/deletejewllery/:Id',middleware,jewllery.deleteProduct);
Router.get('/search',jewllery.search);
module.exports=Router;
