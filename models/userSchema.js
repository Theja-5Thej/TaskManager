const mongoose = require("mongoose")
const uniqueValidator  = require("mongoose-unique-validator")
const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required :[true,"Please enter username "]

        },
        email:{
            type:String,
            required:[true,"Please enter emailID "]
        },
        password:{
            type:String,
            required:[true,"Please enter password "]
        }
    },
    {
        timestamps:true
    }
)
userSchema.plugin(uniqueValidator)
const user = mongoose.model("user",userSchema)
module.exports =user