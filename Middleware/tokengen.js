const {sign} = require('jsonwebtoken');

function accesstokengen (userId){
return sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'})   
}
function refreshtokengen(userId){
    return sign({userId},process.env.REFRESH_SECRET,{expiresIn:'7d'});
}
function sendaccesstoken (req,res,accesstoken){
    res.send({
           accesstoken,
           loggedin: true,
           message:'Succesfully Logged In congratulation'
    })
}
function sendrefreshtoken(res,refreshtoken){
    res.cookie('refreshtoken',refreshtoken,{
        httpOnly:true,
        path:'/user/refresh_token',
        maxAge:900000
    })
}

module.exports={
    accesstokengen,
    refreshtokengen,
    sendaccesstoken,
    sendrefreshtoken
}