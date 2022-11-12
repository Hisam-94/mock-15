const {Router} = require("express")
const { authentication } = require("../Middlewares/authentication")
const { BlogModel } = require("../Models/blogModel")
const mongodb = require("mongodb")

const BlogRoute = Router()

BlogRoute.post("/create",authentication, async(req,res)=>{
    try{
        const {title,category,author,content,username} = req.body
        const data = await new BlogModel({
            title,
            category,
            author,
            content,
            username
        })
        await data.save()
        res.send({msg:"Post added Successfully"})
    }
    catch(err){
        console.log(err)
    }
})

BlogRoute.get("/",authentication, async(req,res)=>{
    try{
        if(req.query)
        {
            const result = await BlogModel.find({...req.query})
            if(result.length == 0)
            {
                res.send({msg:"Not Found"}) 
            }
            res.send(result)
        }else
        {
            const result = await BlogModel.find({})
            if(result.length == 0)
            {
                res.send({msg:"Not Found"}) 
            }
            res.send(result)            
        }
    }
    catch(err){
        console.log(err)
    }
})

BlogRoute.delete("/delete/:id",authentication,async(req,res)=>{
    try{
        const {username} = req.body
        const {id} = req.params
        const result = await BlogModel.findOneAndDelete({username,id})
        if(result){
            res.send("Item deleted")
        }else
        {
            res.send({msg:"Not found"})
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"Something went wrong"})
    }
})

BlogRoute.put("/edit/:id",authentication, async(req,res)=>{
    try{
        const {username} = req.body
        const {id} = req.params
        const result = await BlogModel.findOneAndUpdate({username,id},req.body)
        if(result){
            res.send("Updated")
        }else
        {
            res.send({msg:"Not found"})
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"Something went wrong"})
    }
})

module.exports = {
    BlogRoute
}