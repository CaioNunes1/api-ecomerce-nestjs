import * as mongoose from 'mongoose';

export const UserSchema =new mongoose.Schema({
   name:String, 
   password:String,
   seller:{
    type:Boolean,
    default:false
   },
   address:{
    addr1:String,
    adrr1:String,
    city:String,
    country:String,
    zip:String,
   },
   created:{
    type:Date,
    default:Date.now,
   }
})