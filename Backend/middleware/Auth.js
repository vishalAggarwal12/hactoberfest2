const jwt =require("jsonwebtoken");
const user= require("../models/user")
const auth=async(req,res,next)=>{
try{

  const token = req.cookies.fuck;

  if(token){
    const payload= await jwt.verify(token,process.env.JWTKEY);
    req.userinfo=payload;

     next();
  }else{
    next();
  }
 
}catch(e){

}
}
const directlogin=async(req,res,next)=>{


if(req.userinfo){
    const{_id}=req.userinfo;
    console.log(_id)
    const find_user= await user.findOne({_id}).populate("category").populate("work");


    res.json({
        succ:true,
        data:find_user
    })
}

else{
    next();

}
}
module.exports={auth,directlogin}