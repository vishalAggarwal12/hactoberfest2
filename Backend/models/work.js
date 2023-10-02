const mongoose= require("mongoose");
const work_schema= mongoose.Schema({
// title of the work which we want to add
title:{
    type:String,
    require:true
},
//  Dsc related to the category for which category is all about
dsc:{
    type:String,
    require:true

},
// category-all the work related to the category 
category:{
    type:mongoose.Schema.ObjectId,
    ref:"category"
},
//user -user id for which we added the work 
user:{
    type:mongoose.Schema.ObjectId,
    ref:"user"
},
// work is done or not 
Isdone:{
    type:Boolean,
    default:false,
    require:true
}
})
const work = mongoose.model("work",work_schema);
module.exports=work