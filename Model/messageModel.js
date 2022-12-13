const mongoose = require('mongoose');
const messageSchema = require('../Schema/messageSchema');

const message = mongoose.model('message',messageSchema);

export default message;