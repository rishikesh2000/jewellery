const express=require('express');
const Router=express.Router();
const upload=require('../middleware/upload')
const jewllery=require('../controller/jewellery');
const middleware=require('../middleware/jwt');

Router.post('/addjewellery',middleware,upload,jewllery.jewellery);
Router.get('/getjewellery',jewllery.getjewellery);
Router.get('/getonejewellery/:Id',jewllery.getOnejewellery);
Router.delete('/deletejewellery/:Id',middleware,jewllery.deleteProduct);
Router.get('/search',jewllery.search)
Router.get(['/category/:category?','/:name?', '/gender/:gender?', '/material/:material?' ], jewllery.getFindJewellery)

module.exports=Router;
