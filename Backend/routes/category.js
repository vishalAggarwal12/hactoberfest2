const express= require("express");
const router=express.Router();
const category=require("../models/category");
const work = require("../models/work");
const user = require("../models/user");
router.post("/addcategory",async(req,res)=>{
    console.log("add category path");
try{
const{user_id,title,dsc}=req.body;
if(!title||!dsc||!user_id){
    throw Error(" fill all the data")
}else{
const add_cat= await category.create(req.body);
const find_user = await user.findOneAndUpdate({_id:user_id},  {
    $push: {
        category:add_cat._id
    },
  },
  { new: true }).populate("category").populate("work");
  console.log("succ add category ");

  res.status(200).json({
    succ: true,
   data:find_user,
   message: "cat added succ",

  })
}
}catch(e){
    console.log("issue at add category path");

    res.status(400).json({
        succ: false,
        message: e.message,
      });
}
})

router.post("/deletecategory",async(req,res)=>{
try{
    console.log("delete cat path")
    const{user_id,cat_id}=req.body;
    if(!cat_id||!user_id){
        throw Error(" fill all the data");

    }else{
        const delete_cat= await category.findOneAndDelete({_id:cat_id});
        const update_work = await work.deleteMany({category:cat_id});
        const update_user = await   user.findOneAndUpdate({_id:user_id},  {
           $pull: {
               category:cat_id
           },
         },
         { new: true }).populate("category").populate("work");
  console.log("succ delete category ");
  res.status(200).json({
    succ: true,
   data:update_user,
   message: "cat delete succ",

  })

    }
}catch(e){
    console.log("issue at delete category path");

    res.status(400).json({
        succ: false,
        message: e.message,
      });
}
})
module.exports=router;