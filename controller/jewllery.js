const cloudinary=require('cloudinary').v2;
const Jewllery=require('../module/jewllery');

exports.jewllery=async(req,res)=>{
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
       const newjewllery=new Jewllery({
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
       await newjewllery.save();
       return res.json({
        success:true,
        files:uploadedFiles,
        message:"file uploaded and saved succefully",
        jewllery:newjewllery
       });
    }catch(error){
        console.log('error uploding jewllery',error);
        return res.status(500).json({success:false,message:'an error occure while uploading files'}) 
    }
};

exports.getjewllery=async(req,res)=>{
    try{
        const jewllery=await Jewllery.find();
        if(!jewllery||jewllery.lenth===0){
            return res.json({message:'no photo found'}); 
        }
        return res.json({message:"dashboard retrived successfully",jewllery})

    }catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.getOnejewllery= async (req,res)=>{
    try{
        const Id=req.params.Id;
        if(Id){
            const jewllery=await Jewllery.findById(Id);
            if(!jewllery){
                return res.status(404).json({message:'jewllery is not found'})
            }
            return res.status(200).json(jewllery);
        }
        const jewller=await Jewllery.find();
        return res.status(200).json(jewller);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:'failed to fetch jewllery',error:err.message})
    }
};