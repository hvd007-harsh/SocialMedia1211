const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({ 
     message:{
        type:String,
        require:true
     },
     from:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'user'
     }
})
module.exports= messageSchema;