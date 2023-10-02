const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const user_schema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },password:{
        type:String,
        require:true
    },
    category:[{
        type:mongoose.Schema.ObjectId,
        ref:"category"
    }],
    work:[{
        type:mongoose.Schema.ObjectId,
        ref:"work"  
    }]
})
user_schema.pre("save",async function(next){
if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);

}
next();
})
const user = mongoose.model("user",user_schema);
module.exports=user