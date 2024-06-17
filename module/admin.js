const mongoose =require('mongoose');
const {Schema}=mongoose;

let Admin=new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    collection:"admin"
});
module.exports=mongoose.model("admin",Admin);
