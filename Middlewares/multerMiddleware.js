const multer = require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`Image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter =(req,file,cb)=>{
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
        cb(new Error("The File Should be in Given Formats[jpg,jpeg,png]"))
    }
}

module.exports = multer({
    storage,fileFilter
})