const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// connecting the mysql  with the node js
// its the mmain only the diffrence between the mysql and the mongodb 
// else the difference is in sending the data from backend to the database 
//we have to make the different query for performing the crud operation



const app = express(); 
app.use(express.json());
app.get("/",(req,res)=>{ 
res.json("Hello Its A Backend")
})

//Geting from the books database
app.get("/books",(req,res)=>{
const q ="SELECT * FROM booksdata";
db.query(q,(err,data)=>{
    if(err){
        console.error(err); 
        return res.json("Error Occured");
    }else{
        console.log(data.length)

        return res.json(data);

    }
})
})
//Adding Into the books database
app.post("/books",(req,res)=>{
    const q= "INSERT INTO booksdata (`bookname`,`bookdsc`,`bookpic`) VALUES (?)";
    const values = [req.body.title,req.body.dsc,req.body.pic ];
    db.query(q,[values],(err,data)=>{
       if(err) {return res.json(err);}
       else{
        return res.json("book saved succ")
       }

    })
})

app.post("/updatebooks",(req,res)=>{
const values = [req.body.title,req.body.dsc,req.body.pic ];
const q = `UPDATE booksdata SET bookname=?, bookdsc=?, bookpic=? WHERE bookname=?`;
db.query(q, [req.body.newname, req.body.dsc, req.body.pic, req.body.oname],(err,data)=>{
    if(err) {return res.json(err);}
    else{
     return res.json("book updates succ")
    }
})
})
//delete books
app.post("/delete",(req,res)=>{

    const q = `DELETE FROM booksdata  WHERE bookname=?`;
    db.query(q, [req.body.oname],(err,data)=>{
        if(err) {return res.json(err);}
        else{
                console.log(data.length)
         return res.json(data.length)
        }
    })
    })

    
app.listen(8000,()=>{
    console.log("Started My Sql at 8000")
})
