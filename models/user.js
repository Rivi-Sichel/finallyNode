import { Schema, model } from "mongoose";




const userSchema = Schema({
    userName:String,
    userPassword:String,
    userEmail:String,
    userPhone:String,
    userRole:String,
    userRegiserDate:{ type: Date, default: new Date() }
})

export const userModel = model("user", userSchema)