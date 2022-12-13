const {verify} = require('jsonwebtoken');

module.exports = (req,res)=>{
    console.log("headers",req.headers);
    const authorization = req.headers['authorization'];
    console.log(authorization);
    if(!authorization){
        throw new Error("You need to Login! Sorry");
    }
    const token = authorization.split(' ')[1];
    const {userId}= verify(token,process.env.ACCESS_TOKEN_SECRET);
    return userId;
}

