const mongoose= require("mongoose");
const category_schema= mongoose.Schema({
// title of the category which we want to add
title:{
    type:String,
    require:true
},
// Short Dsc related to the category for which category is all about
dsc:{
    type:String,

},
// work-all the work related to the category 
work:[{
    type:mongoose.Schema.ObjectId,
    ref:"work"
}],
//user -user id for which we added the category 
user:{
    type:mongoose.Schema.ObjectId,
    ref:"user"
},
})
const category = mongoose.model("category",category_schema);
module.exports=category