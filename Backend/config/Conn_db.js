const mongoose= require("mongoose");
const con_db=async()=>{
    try{
      mongoose.connect(process.env.DB_URL,{

        useNewUrlParser:true,
        useUnifiedTopology:true
      }).then(()=>{
        console.log("DataBase Connected Succ")
      }).catch((e)=>{
        console.log("error at connecting database",e.message)
      })
    }catch(e){
        console.log("error at connecting database",e.message)

    }
}

module.exports =con_db