import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://atharvavrakhunde:ruleworld@cluster0.j5btm.mongodb.net/c:\codes\Fresh-bake').then(()=>console.log("db connected"))
}