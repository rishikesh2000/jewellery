const USER=require('../module/user')
const bcrypt=require('bcrypt');
const jwt=require('../controller/jwt');

exports.signup=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser = await USER.findOne({ email })
        if (existingUser) {
     return res.status(400).json({ error: 'username already exists' });
        }

        if(!email||!password){
            return res.status(400).json({error:'all fields are require'});
        }
        const hashedPassword=await bcrypt.hash(password,10);
       const newuser= new USER({
        email,
        password:hashedPassword
       });
       await newuser.save();
       res.json({message:'user signup successful' });
}catch(err){
    console.error('error saving user to database',err);
    res.status(500).json({error:'error saving user to database'});
}
};
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user =await USER.findOne({email});
        if (!user){
            console.log("user not found");
            return res.status(401).json({message:'user not found'});
        }
        const passwordMatch= await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
            console.log("password not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token=jwt.generateToken({email});
        console.log(token);
        res.status(200).json({ message: 'Login successful',token});

    }catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};
