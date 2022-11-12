const {Router} = require("express")
const bcrypt = require('bcryptjs');

const { UserModel } = require("../Models/UserModel")
const SignUpRoute = Router()

SignUpRoute.post("/", async(req,res)=>{
    try{
        const {email,password,username} = req.body
        const present = await UserModel.findOne({email:email})
        if(present)
        {
            res.send({msg:"User already exists"})
        }else
        {
            bcrypt.hash(password, 7, async function(err, hash) {
                if(err)
                {
                    console.log(err)
                }else
                {
                    const data = new UserModel({username:username,email:email,password:hash})
                    await data.save()
                    res.send("Account created successfully")
                }
            });
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"Something went wrong"})
    }
})

module.exports = {
    SignUpRoute
}