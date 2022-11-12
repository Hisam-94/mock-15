const express = require("express")
const cors = require("cors")
const { connection } = require("./Config/db")
const { BlogRoute } = require("./Routes/blogRoutes")
const { SignUpRoute } = require("./Routes/signupRoute")
const { LoginRoute } = require("./Routes/loginRoute")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/signup", SignUpRoute)
app.use("/login", LoginRoute)
app.use("/blog",BlogRoute)

const PORT = process.env.PORT || 8080

app.listen(PORT, async()=>{
    try{
        await connection
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log("PORT running on"+ PORT)
})