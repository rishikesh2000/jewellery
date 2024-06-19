const Razorpay=require("razorpay");

const crypto=require('crypto');

const razorpay = new Razorpay ({

key_id:"rzp_test_R4XhZB6m3vUozi",
key_secret:"kMZQuORkGf4PgCZ6tWNN5w7G"
    
})

exports.createOreder=async(req,res)=>{
    const {amount}=req.body;
    if(!amount){
        return res.status(400).json({message:"please enter your amount"})
    }
const options ={
amount:amount*100,
currency:"INR",
receipt:"order_rcptid_11",
payment_capture:1
};

try {

    const response = await razorpay.orders.create(options);

    res.status(201).json({

        name: response,
        order_id: response.id,
        currency: response.currency,
        amount: response.amount
    })
    
} catch (error) {
    return res.status(400).send("order not created");
}
};

exports.verification=(req,res)=>{
    try{
        const{ razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature){
    return res.status(500).json({message:"all field are require"});
}
const body=razorpay_order_id+"|"+razorpay_payment_id;
const exprectedSignature= crypto.createHmac('sha256',razorpay.key_secret)
.update(body.toString())
.digest('hex');
console.log('signature recevied',razorpay_signature);
console.log('signature generated',exprectedSignature);
const isAuthentic=exprectedSignature===razorpay_signature;
if(!isAuthentic){
    return res.status(400).json({success:false})
}
return res.status(200).json({success:true})
    }catch(err){
return res.status(500).json({message:err});
    }
}