var jwt = require('jsonwebtoken');
require("dotenv").config()

const authentication = (req,res,next)=>{
    if(!req.headers.authorization)
    {
        return res.send({msg:"Please login"})
    }
    const token  = req.headers?.authorization?.split(" ")[1]
    jwt.verify(token, process.env.KEY, function(err, decoded) {
        if(err)
        {
            res.send({msg:"Please login"})
        }else
        {
            req.body.username = decoded.username
            next()
        }
    });

}

module.exports = {
    authentication
}