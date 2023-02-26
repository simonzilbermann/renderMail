const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const multer=require('multer')
//const multer=require('multer')
//טעינת משתני הסביבה לתוך אובייקט במערכת
require('dotenv').config();

//const ProfileRouter=require('./routes/cv');

app.set((__dirname));
app.set('view engine','hbs'); 

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

//app.use('/uploads', express.static('uploads'));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=='ProfileCv')
            cb(null,'./uploads/files/');
        },
    filename:(req,file,cb)=>{
        if(file.fieldname=='ProfileCv')
        {
            let filename= Math.floor( Math.random() * 100000);
            let fileExtension=file.originalname.split('.').pop();//  שליפת הסיומת של קובץ
      
            cb(null,filename+"." +fileExtension);
        }
    }
    });

    

const uploadProfilePic=multer({
    storage:storage
});

app.post("/contact",uploadProfilePic.array("ProfileCv",10),(req,res)=>{

    //     let allurls="";
    // for(let i=0;i<req.files.length;i++){
    //  allurls += req.files[i].filename+",";
    // } 
  
    require('./controller/cv').AddProfile(req,res);
    return require('./controller/cv').ManagerEmail(req,res);
    
    //res.render('profiledetials',{urls:allurls ,name:req.body.Name});

});


//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri = process.env.MONGO_CONN_STR;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('mongo db connected')});


app.get('/contact',(req,res)=>{
    res.render('profile');
  })
//app.use("/contact",ProfileRouter);



//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 Page not Fount"})
    });
module.exports = app;