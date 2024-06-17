const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const secretKey=process.env.secret_key;

module.exports=(req,res,next)=>{
    const token=req.header.authorization;
    if(!token){
        return res.status(401).json({message:'no token provided'});  
    }
    const tokenValue=token.split(' ')[1];
    jwt.verify(tokenValue,secretKey,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:'failed to authenicate token'});
        }
        req.email=decoded.userId;
        next();
    });
};