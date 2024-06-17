const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const secretKey=process.env.secret_key;

exports.generateToken=(userId)=>{
    const payload={
        userId:userId
    };
    return jwt.sign(payload,secretKey,{expiresIn:'1h'} )
};

exports.verifyToken=(token)=>{
    try{
        const decoded=jwt.verify(token,secretKey);
        return decoded.userId;
    }catch(error){
        return null;
    }
};