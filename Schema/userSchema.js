const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
       type:String,
       require:true,
       trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        requrie:true,
        trim:true,
        unique:true
    },
    friend:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'user',
        default:[]
    },
    address:{
       type:String,
       require:true,
       trim:true,
    },
    img:{
        type:String,
        require:true,
        trim:true
    },
    refreshtoken:{
        type:String,
        expiresIn:3600
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

module.exports = {userSchema};