const express = require("express")
const expresAsyncHandler = require("express-async-handler")
const user = require("../models/userSchema")
const router = express.Router()
const validator = require("validator")

router.route('/').get(expresAsyncHandler(async(req, res) => {
    const users = await user.find( )
    res.status(200).json(users)
}))
//login
router.route('/login').get(async(req, res) => {
    try {
        const users = await user.findOne({username:req.body.username,email:req.body.email})
        if(users.password === req.body.password){
            res.status(200).json({users,message:"logged in successfully"})
        }else{
            res.status(400).json({message:"Incorrect password...!"})
        }
    } catch (error) {
        res.json({message:"Invalid account details or If you dont have account please signin"})
    }
})
//get by id
router.route('/:id').get(expresAsyncHandler(async(req, res) => {
    const users = await user.findById(req.params.id)
    if(!users){
        res.status(404)
        throw new Error("Account not found...")
    }
    res.status(200).json(users)
}))
//author signup
router.route('/auth/signup').post(async(req, res) => {
    try {
        const {username,email,password}=req.body;
           if(validator.isEmail(email)){
            const users = await user.create({
                username,email,password
              })
                res.status(200).json(users)
                
           }else{
            res.status(400).json({message:"Please enter valid email...!"})
           }
    } catch (error) {
        res.status(400).json({message:"you have already an account .. please login....!"})
    }
  
})
//delete by id
router.route("/:id").delete(expresAsyncHandler(async(req,res)=>{
        const users =await user.findByIdAndDelete(req.params.id)
        if(!users){
            res.status(404)
            throw new Error("Account not found...")
        }
        res.status(200).json(users)
}))
//update by id
router.route("/:id").put(expresAsyncHandler(async(req,res)=>{
    const users =await user.findById(req.params.id)
    if(!users){
        res.status(404)
        throw new Error("Account not found...")
    }
    const updated = await user.findByIdAndUpdate(
        req.params.id,
        req.body,
       {new:true}
    )
    res.status(200).json(updated)
}))

module.exports = router