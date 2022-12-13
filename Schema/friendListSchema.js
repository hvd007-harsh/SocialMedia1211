const mongoose = require('mongoose');

const friendListSchema = mongoose.Schema({
 
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        require:true
    }
})
module.exports = friendListSchema;