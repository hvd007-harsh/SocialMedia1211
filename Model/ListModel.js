const mongoose = require('mongoose');
const ListSchema = require('../Schema/friendListSchema');

const list = mongoose.model('list',ListSchema);
module.exports =  list;