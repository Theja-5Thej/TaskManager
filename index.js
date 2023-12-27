const express = require("express")
const app = express()
const mongoos = require("mongoose")

app.use(express.json())
app.use("/",require("./Routers/userRoutes"))

// databse connection
mongoos.connect('mongodb+srv://theja:theja123@cluster0.irxkhlb.mongodb.net/')
.then(()=>{
    console.log("Data base connected successfully....!")
    app.listen(3001,()=>{
        console.log(`server is running on port ${3001}`);
    })
})
.catch(()=>console.log("Not Able to connect to database....###"))


