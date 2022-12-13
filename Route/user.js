const route = require('express').Router();
const upload = require('../Middleware/multer');
const multer = require('multer');
const validate = require('../Middleware/authValidator');
const logvalid = require('../Middleware/loginvalidator');
const auth = require('../utils/auth');
const bcrypt = require('bcrypt');
const user = require('../Model/userModel');
const fs = require('fs');
const {verify} = require('jsonwebtoken');
const {
  accesstokengen,
  refreshtokengen,
  sendaccesstoken,
  sendrefreshtoken
} = require('../Middleware/tokengen');


route.post('/login', async(req, res) => {
  try {
    req.user = req.body;
    const {
      email,
      password
    } = req.body;
    console.log(req.user);
    var val = logvalid(req, res);
    console.log(val);
    if (!val.isValid) {
      throw new Error("Please fill the correct information");
    }
    let User = await user.findOne({email});
    console.log(User);
      if(!User){
        throw new Error("User does not exist please login again");
      }
      var checkpass = await bcrypt.compare(password, User.password);
      if (!checkpass) {
        throw new Error("Password did not match");
      }
      const Accesstoken = accesstokengen(User._id);
      const Refreshtoken = refreshtokengen(User._id);

      // await user.updateOne({_id:User._id},{
      //   refreshtoken: Refreshtoken
      // },()=>{
      //   console.log("Updated");
      //   res.send({status:202});
      // })
      User.refreshtoken = Refreshtoken;
      await User.save();
      //Sending Refresh token
      sendrefreshtoken(res, Refreshtoken);

      sendaccesstoken(req, res, Accesstoken);
  } catch (error) {
    res.send({
      message: error.message
    });
  }
})

route.post('/register', async(req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err);
    }
    try {
      req.user = req.body;
      const {email} = req.user;
      const filename = req.file.filename;
      console.log(filename);
      const valid = validate(req, res);
      console.log((valid.isValid));
      console.log((valid.errors));
      if (!valid.isValid) {
        throw new Error("Fields should be correct and not be empty /t" + filename);
      }
      var check_user = await user.find({email});
      console.log("pass");
      console.log(check_user);
      if(check_user[0]) throw new Error("User already exist /t"+filename);
      //1.make jwt authentication 
      // Everything went fine.

      //2.Make validate and  not empty

      //3.hash the password 
      //5.upload data to the database
      var hash = await bcrypt.hash(req.user.password, 10);
      req.user.password = hash;
      req.user.img = req.file.filename;
      console.log(req.user);
      const User = new user(req.user);
      await User.save((err) => {
        console.log(err);
      });
      //4. make sure use multer as upload 
      res.send("Successfully Registered");
    } catch (error) {
      const filename = error.message.split('/t')[1];
      // res.send(error.errors).status(400);
      fs.rm('public/image/' + filename, () => {
        console.log(filename + " file is deleted");
      });
      res.send(error.message.split('/t')[0]).status(401);
    }

  })

});

route.post('/my_profile',async(req,res)=>{
  try {
    const userId = auth(req,res);
    console.log(userId);
    const User= await user.findById(userId);
    console.log(User);
    User.password=null;
    res.send(User);
    
  } catch (error) {
     res.send(error).status(404);
  }
})
route.post('/refresh_token',async(req,res)=>{
  try {
    let token = req.cookies.refreshtoken;
    console.log(token);
    if(!token) return res.send({accesstoken: ""});
    let payload = null;
    payload = verify(token,process.env.REFRESH_SECRET);

    console.log(payload);
    const User = await user.findById(payload.userId);
    if(!User) return res.send({accesstoken:""});
    if(User.refreshtoken !== token){
      return res.send({accesstoken: ""});
    }
    console.log(User._id);
    //Token exist create new Refresh token 
    const refreshtoken = refreshtokengen(User._id);
    const accesstoken = accesstokengen(User._id);

    User.refreshtoken = refreshtoken ;
    await User.save();
    //All good to go send new refresh token and accesstoken
    res.send({
      accesstoken
    }) 
  } catch (error) {
    console.log(error);
  }
})

route.post('/logout',(req,res)=>{
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      res.send({
        message: "LogOut",
      });
    } catch (error) {
      console.log(error);
    }
})



module.exports = route;