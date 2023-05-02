const express = require("express");
require('dotenv').config();
const { connection } = require("./config/db");
const app = express();
app.use(express.json());
const {userRoute} = require("./router/user.route");
const { authentication } = require("./middleware/authenication");
const { postRoute } = require("./router/post.route");

// app.use("/",(err,res)=>{
//     res.send("welcome to the mock");
// })
app.use("/",userRoute)
app.use(authentication)
app.use("/posts",postRoute)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongo");
    }
    catch(err){
        console.log("msg:",err);
    }
    console.log(`connected to port ${process.env.port} successfully`)
})
