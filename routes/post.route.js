const express = require("express")
const {PostModel} = require("../models/post.model")

const postRoute = express.Router()


postRoute.post("/create", async(req,res)=>{
    try{
        const data = req.body;
        const newData = new PostModel(data)
        await newData.save()
        res.send("You Posted Successfully")
    }
    catch(err){
        res.send(err)
    }
})
postRoute.get("/:id", async(req,res)=>{
    const id = req.params.id;
    try{
        const data = await PostModel.find({userID:id})
        if (data.length>0){
            res.send(data)
        }
        else {
            res.send("No Post is there")
        }
    }
    catch(err){
        res.send(err)
    }
})

postRoute.patch("/update/:id", async(req,res)=>{
    try{
        const _id = req.params.id
        const data = req.body
        const update = PostModel.findByIdAndUpdate(_id,data)
        await update.save();
        res.send({"msg":"Post Updated","updated":update})
    }
    catch(err){
        res.send("Something Wrong")
    }
})

postRoute.delete("/delete/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        await PostModel.findByIdAndDelete({_id:id})
        req.send("Post Deleted")
    }catch(err){
        res.send(err)
    }
})


module.exports = {
    postRoute
}