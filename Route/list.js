const route = require('express').Router();
const user = require('../Model/userModel');
const auth = require('../utils/auth');
const upload = require('../Middleware/multer');
const multer = require('multer');
const fs =require('fs');

route.get('/all_friend',async(req,res)=>{
    const userId = auth(req,res);
    const alluser = await user.aggregate([
        { 
            $project:{ 
                "password":0,
                "email":0,
                "refresh_token":0,
                "address":0,
                "friend":0
            }
        }
    ]);
    res.send({alluser,userId});
});
route.get('/my_profile',async(req,res)=>{
    try {
        const userId = auth(req,res);
        const profile = await user.findOne({_id:userId});
        console.log(profile);
        res.send(profile);
    } catch (error) {
        res.send(error).status(404);
    }
})
route.post('/add_friend',async(req,res)=>{
   try{ 
     const userId = auth(req,res);
     console.log(req.body);
     const friend_id = req.body.friend_id;
     console.log(friend_id);
     const userdata = await user.findOne({_id:userId});
     console.log("adf")
     // const check_friend = list.find({friend:friend_id});
     // if(check_friend){
       //     throw new Error("Friend is already exist");
       // }
       // const friend_list = new list({
         //     user: userId,
         //     friend:{$push:{"friend":friend_id}}
         // })
         
         // await friend_list.save()
    console.log(friend_id);
    if(userdata.friend.includes(friend_id)) {
        throw new Error(" Friend already exists")
    };



    userdata.friend.push(friend_id);

    await userdata.save();
    res.send("Successfully added")
    
    }
    catch(err)
    {
       res.send(err.message.message).status(401);
    }
    
})
route.get('/my_friend',async(req,res)=>{
    console.log('ashfdjasdf');
     const  userId = auth(req,res);
     console.log(userId);
     const user_data = await user.findOne({_id:userId}).populate('friend');
     res.status(200).json(
      {friend:user_data.friend}
     )
})



route.put("/update_profile",(req,res)=>{
    upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err);
    }
    try {
      const userId = auth(req,res);
      const user_data=await user.findOne({_id:userId});
      req.user = req.body; 
      const {address,name} = req.user;
      const filename = req.file.filename;
      console.log(filename);
        if(filename){
         const last_img = user_data.img;
         fs.rm('public/image/' + last_img, () => {
           console.log(last_img + "last image file  is deleted");
         });
         user_data.img = filename;
        }else{
            fs.rm('public/image/' + filename, () => {
              console.log(filename + "file is deleted");
            });
        }
        if(req.user.address){
            user_data.address = address;
        }
        if(req.user.name){
            user_data.name = name; 
        }
      
        await user_data.save();
    } catch (error) {
      const filename = error.message.split('/t')[1];
      // res.send(error.errors).status(400);
      fs.rm('public/image/' + filename, () => {
        console.log(filename + " file is deleted");
      });
      res.send(error.message.split('/t')[0]).status(401);
    }

  })

})

module.exports = route;