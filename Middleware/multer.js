const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,"public/image")},
    filename:(req,file,cb)=>{ cb(null,Date.now()+"-"+file.originalname)}
})
const filter =(req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new Error("Not an Image! Please upload an image"),false)
    }
}

var limits = {
    //files: 1, // allow only 1 file per request
    fileSize: 100000 * 1024
};

const upload= multer({
    storage,
    fileFilter:filter,
    limits
}).single("image");


module.exports = upload;