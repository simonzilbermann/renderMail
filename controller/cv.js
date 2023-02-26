const Profile=require('../models/cv')
const mongoose = require('mongoose');

module.exports={
    AddProfile:(req,res)=>{
      

        const {Name,Email,Tel} = req.body;

        const cv=new Profile({
            _id:new mongoose.Types.ObjectId(),
            Name:Name,
            Email:Email,
            Tel:Tel
        });
        const subject="מייל איתחברות";
        const name=Name;
        const mail=Email;
        const tel=Tel;
        const message="יתחברתה בהצלחה נשוב הלך";
        const content=name+"<br>"+ mail +"<br>" + tel + "<br>" + message;//שמירת תןכן המייל
        const to=mail;//שמירת כתובת הנעמן אליו יש לשלוח את המייל
        //const from=process.env.GMAIL_USER;
        const htmlContent='<h1>' + content + '</h1>' + '<br><img src="cid:image1" width="400" height="300" />';
        const attachments=[
          {
            filename: 'data.txt',
            content: 'Hello Yaron🤗',
          },
          {
            filename: 'orque.png',
            path: './orque.png',
            cid: 'image1'
          }
        ];
        require('../mailer').SendMail(to,subject,content,htmlContent,attachments);
        cv.save().then((profile)=>{
            // if(profile != null)
            //   return res.status(200).json({Msg:"The new profile is " + Name});
            // else return res.status(409).json({Msg:profile});
        })
    },
    ManagerEmail:(req,res)=>{
      

      const {Name,Email,Tel} = req.body;

      const subject="new peofile";
      const name=Name;
      const mail="simonzilberman333@gmail.com";
      const tel=Tel;
      const message="יתחברות חדש";
      const content=name+"<br>"+ Email +"<br>" + tel + "<br>" + message;//שמירת תןכן המייל
      const to=mail;//שמירת כתובת הנעמן אליו יש לשלוח את המייל
      //const from=process.env.GMAIL_USER;
      const htmlContent='<h1>' + content + '</h1>' + '<br><img src="cid:image2" width="400" height="300" />';
      const attachments=[
        {
          filename: 'data.txt',
          content: 'Hello Yaron🤗',
        },
        {
          filename: 'orqueimg.jpg',
          path: './orqueimg.jpg',
          cid: 'image2'
        }
      ];
      require('../mailer').SendMail(to,subject,content,htmlContent,attachments);
  }
} 
