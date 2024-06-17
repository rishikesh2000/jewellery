const express=require('express');
const Router=express.Router();
const upload=require('../middleware/upload')
const jewllery=require('../controller/jewllery');

Router.post('/addjewllery',upload,jewllery.jewllery);
Router.get('/getjewllery',jewllery.getjewllery);
Router.get('/getonejewllery/:Id',jewllery.getOnejewllery);

module.exports=Router;
