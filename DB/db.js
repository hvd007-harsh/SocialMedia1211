const mongoose = require('mongoose');
console.log(process.env.MONGOURI);
const db = mongoose.connect(process.env.MONGOURI,()=>{
    console.log("Db is Connected");
})

exports = {db}