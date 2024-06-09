import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
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
});

UserSchema.pre<UserDocument>('save', async function (next) {
   const user = this;// Cast `this` to `any` to access user properties
 
   // Se a senha não foi modificada, seguir adiante
   if (!user.isModified('password')) {
     return next();
   }
 
   try {
     // Realizar operações assíncronas, como hashing de senha
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(user.password, salt);
     user.password = hash;
     next();
   } catch (error) {
     next(error);
   }
 });
 
 export const User = mongoose.model('User', UserSchema);