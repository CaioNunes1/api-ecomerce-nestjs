import * as mongoose from 'mongoose';

export const OrderSchema= new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,//indica que o campo owner é um ID de objeto do 
        //MongoDB. O MongoDB usa ObjectId como identificadores únicos para documentos.
        ref:'User'
    },
    totalPrice:{
        type:Number,
        default:0
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,//basicamente o objectid fala que é um ibjeto
            ref:'Product',
        },
        quantity:{
            type:Number,
            default:0,
        },
        created:{
            type:Date,
            default:Date.now,
        }
    }]
})