const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {connection} = require("./db")
const {userRoute} = require("./routes/user.routes")
const {postRoute} = require("./routes/post.route")
const {authentication} = require("./middleware/authentication")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send({"msg":"Hello World"})
})

app.use("/user",userRoute)
app.use(authentication)
app.use("/post",postRoute)

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
    console.log("Server at 4000")
})