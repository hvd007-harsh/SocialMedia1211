const mongoose = require('mongoose');
const {userSchema} = require('../Schema/userSchema');

 
module.exports = mongoose.model('user',userSchema);