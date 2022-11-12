const {Router} = require("express")
require("dotenv").config()
const bcrypt = require('bcryptjs');
const { UserModel } = require("../Models/UserModel")
const LoginRoute = Router()
var jwt = require('jsonwebtoken');


LoginRoute.post("/", async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email:email})
        if(user)
        {
            const hash = user.password
            const username = user.username
            // console.log(username)
            bcrypt.compare(password, hash, function(err, result) {
                if(err)
                {
                    console.log(err)
                    res.send({msg:"Something went worng"})
                }
                if(result)
                {
                    jwt.sign({ username: username }, process.env.KEY,async function(err, token) {
                        if(err)
                        {
                            res.send({msg:"Somethong went wrong"})
                        }else
                        {
                            res.send({msg:"Login sucessfull",token:token})
                        }
                    });
                }else
                {
                    res.send({msg:"Login failed, Invalid credentials"})
                }
            });
        }else
        {
            res.send({msg:"Login failed, Invalid credentials"})
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"Somethong went wrong"})
    }
})

module.exports = {
    LoginRoute
}