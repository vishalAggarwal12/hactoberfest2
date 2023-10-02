const express= require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const cookieparser= require("cookie-parser");
const con_db=require("./config/Conn_db");
const userroutes=require("./routes/userroutes");
const categoryroutes=require("./routes/category");
const workroutes=require("./routes/work");
const app = express();
// for readding the request body data easily
app.use(express.json());
// for avoiding the cors error on the backend side
app.use(cors());
// connecting the data base
dotenv.config();
con_db();
app.use(cookieparser());

// creating the different routes
app.use("/api/user",userroutes);
app.use("/api/category",categoryroutes);
app.use("/api/work",workroutes);


// listning the server
app.listen(process.env.PORT,()=>{
console.log("server started at the port number",process.env.PORT)
})
