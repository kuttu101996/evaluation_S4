const express = require("express")
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { JsonWebTokenError } = require("jsonwebtoken")

const userRoute = express.Router()

userRoute.post("/login", async(req,res)=>{
    try{
        const {email,pass} = req.body;
        const user = await UserModel.find({email})
        if (user.length>0){
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if (result){
                    const token = jwt.sign({ userID: user[0]._id, name:user[0].name }, 'shhhhh');
                    res.send({"msg":"login Successful","id":user[0].id,"token":token})
                }
                else {
                    res.send(err.message)
                }
            });
        }
        else {
            res.send("Please login first")
        }
    }
    catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }

})

userRoute.post("/register", async(req,res)=>{
    try{
        const {email,pass,age,name,gender,city} = req.body;
        const user = await UserModel.find({email})
        if (user.length>0){
            res.send("User already exist")
        }
        else {
            bcrypt.hash(pass, 4, async function(err, hash) {
                // Store hash in your password DB.
                const saving = new UserModel({email,name,pass:hash,age,gender,city})
                await saving.save()
                res.send({"msh":"Successfully registered"})
            });
        }
    }
    catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})



module.exports = {
    userRoute
}