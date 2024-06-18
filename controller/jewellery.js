const cloudinary=require('cloudinary').v2;
const upload = require('../middleware/upload');
const jewellery=require('../module/jewellery');

exports.jewellery=async(req,res)=>{
    try{
    
        if(!req.files||!req.files.length===0){
            return res.json({success:false,message:'no file is provided'});
        }
        const {name,price,descripiton,discount,material,category,gender,gross_weight,net_weight}=req.body
        
        // if(!name||!price||!descripiton||!discount||!material||!category||!gender||!gross_weight||!net_weight){
        //     return res.status(400).json({message:'all fields are require'});
        // }
     
        const uploadedFiles=[];

        for(const file of req.files){
            const result=await cloudinary.uploader.upload(file.path,{folder:'image'});
            uploadedFiles.push({client_id:result.public_id,url:result.secure_url});
        }
       const newjewellery=new jewellery({
        upload:uploadedFiles,
        name,
        price,
        descripiton,
        discount,
        material,
        category,
        gender,
        gross_weight,
        net_weight 
       })
       await newjewellery.save();
       return res.json({
        success:true,
        files:uploadedFiles,
        message:"file uploaded and saved succefully",
        jewellery:newjewellery
       });
    }catch(error){
        console.log('error uploding jewellery',error);
        return res.status(500).json({success:false,message:'an error occure while uploading files'}) 
    }
};

exports.getjewellery=async(req,res)=>{
    try{
        const jewellery=await jewellery.find();
        if(!jewellery||jewellery.lenth===0){
            return res.json({message:'no photo found'}); 
        }
        return res.json({message:"dashboard retrived successfully",jewellery})

    }catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.getOnejewellery= async (req,res)=>{
    try{
        const Id=req.params.Id;
        if(Id){
            const jewellery=await jewellery.findById(Id);
            if(!jewellery){
                return res.status(404).json({message:'jewellery is not found'})
            }
            return res.status(200).json(jewellery);
        }
        const jewller=await jewellery.find();
        return res.status(200).json(jewller);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:'failed to fetch jewellery',error:err.message})
    }
};
exports.deleteProduct=async (req,res)=>{
    try{
        const {Id}=req.params;
        const product = await jewellery.findById(Id);
        if(!product){
            return res.status(404).json({message:'product not found'});
        }
await jewellery.deleteOne();
return res.status(200).json({message:'product deleted successfully'});
    }catch(error){
        console.log(err);
        return res.status(500).json({message:'failed to delete from database'});
    }
};

exports.search=async(req,res)=>{
    try{
        const query=req.query.jewellery;
        const n=await jewellery.find({
            $or:[
                {name:{$regex:query,$options:'i'}},
                {category:{$regex:query,$options:'i'}},
            {material:{$regex:query,$options:'i'}},
            {gender:{$regex:query,$options:'i'}}
            ]
        },{upload:1,name:1,price:1,description:1,material:1,gross_weight:1,net_weight:1}).exec();
    res.json(n);
    }catch(err){
        res.status(500).json({messsage:err.message});
    }
}
