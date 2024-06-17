const mongoose =require('mongoose');
const {Schema}=mongoose;

let User=new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    collection:"user"
});
module.exports=mongoose.model("user",User);
