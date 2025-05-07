'use strict' 
import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, 'public/images');
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb)=>{
  if(file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' 
  ){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

const upload = multer({storage:storage, fileFilter:fileFilter})

export default upload;