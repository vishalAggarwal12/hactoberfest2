const express= require("express");
const work = require("../models/work");
const category = require("../models/category");
const user= require("../models/user");
const router=express.Router();
router.post("/creatework",async(req,res)=>{
        try{
      console.log("create work path");
      const{title,dsc,category_id,user_id}=req.body;
         if(!title||!dsc||!category_id||!user_id){
            throw Error("Please Fill All The Data");
         }
         else{
              const saved_work= await work.create(req.body);
             const updated_category =  await category.findOneAndUpdate({_id:category_id},  {
                $push: {
                    work:saved_work
                },
              },
              { new: true }).populate("work")

            const updated_user =await user.findOneAndUpdate({_id:user_id},  {
                $push: {
                    work:saved_work
                },

              },
              { new: true }).populate("category").populate("work");

              res.status(200).json({
                succ:true,
                messgage:"update succ",
                data:updated_user
              })
         } 
        }catch(e){
  res.status(400).json({
    succ:false,
    messgage:e.message
  })
        }
}
)
router.post("/deletework",async(req,res)=>{
try{
console.log("delete work path")
const{category_id,user_id,work_id}=req.body;
if(!category_id||!user_id||!work_id){
    throw Error("Please Fill All The Data");

}
else{
const update_work = await work.findOneAndDelete({_id:work_id});
const updated_category= await category.findOneAndUpdate({_id:category_id},{ $pull: {
    work:work_id
}},{new:true})
const update_user= await user.findOneAndUpdate({_id:user_id},{
    $pull: {
        work:work_id
    }
},{new:true}).populate("category").populate("work");
res.status(200).json({
    succ:true,
   data:update_user
  })
}
}catch(e){
    res.status(400).json({
        succ:false,
        messgage:e.message
      })
}
})

router.post("/toglework",async(req,res)=>{
    try{
        const{workId,userId}=req.body;

   console.log("toggle work");
   const old_user =await work.findOne({_id:workId});
   const toogle = !old_user.Isdone;
console.log(toogle)
   const update_work=await work.findOneAndUpdate({_id:workId},{Isdone:toogle},{new:true});
   const up_user= await user.findOne({_id:userId}).populate("category").populate("work");
   res.status(200).json({
    succ: true,
   data:up_user,
   message: "cat added succ",

  })
    }catch(e){


    }
})
module.exports=router;