const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const {auth,directlogin} = require("../middleware/Auth");
const jwt = require("jsonwebtoken");
const category=require("../models/category");
const work = require("../models/work");
const router = express.Router();

const create_token=async(object)=>{
const token = await jwt.sign(object,process.env.JWTKEY,{
  expiresIn:"3d"
})
return token;
}
router.post("/signup", async (req, res) => {
  try {
    console.log("signup path");
    // destructuring the geting data from the req.body
    const { name, email, password, cpassword, phone } = req.body;
    if (!name || !email || !password || !cpassword || !phone) {
        // whether all the data entred or not
      throw Error("Please Fill All The Data");
    } else {
        //cpassword or password are same or not
      if (password != cpassword) {
        throw Error("Password Not Match");
      } else {
        // whether user aleready exist orr not
        const check_user =await  user.findOne({ email: email });
        if (check_user) {
          throw Error("User Already Exist");
        } else {
          const saved_user = await user.create(req.body);
          console.log("user added orr created")
            res.status(200).json({
              succ: true,
              message: "saved succ",
              data: saved_user,
            });
          
        }
      }
    }
  } catch (e) {
    res.status(400).json({
      succ: false,
      message: e.message,
    });
  }
});
// 
router.post("/login",auth,directlogin,async(req,res)=>{
    try{
        console.log("login path")
        const {email, password } = req.body;
  if(!email||!password){
    throw Error("Please Fill All The Data");
  }
  else{
    const find_user= await user.findOne({email:email}).populate("category").populate("work");

    if(!find_user){
    throw Error("user Dont Exist");
    }else{
        
        const comp_password= await bcrypt.compare(password,find_user.password);

        if(comp_password){
          const payload={
            _id: find_user._id
          }
          const get_token= await create_token(payload);
            res.cookie("fuck",get_token).status(200).json({
                succ: true,
                message: "login succ",
                data: find_user,
              });
        }
        else{
            throw Error("user Dont Exist");

        }
    }
  }

    }catch(e){
        console.log("issue while loged In")
        res.status(400).json({
            succ: false,
            message: e.message,

          });
    }
})
module.exports = router;
