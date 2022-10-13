import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const sendEmail = (req,res) =>{
  const {email} = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    secure: true,
    port: 465,
    auth: {
      user: "opdeveloper@zohomail.in",
      pass: "Cjqu72ZAUhPZ",
    },
  });
  const mailOptions = {
    from: "opdeveloper@zohomail.in", // sender address
    to: "pratice.development@gmail.com",
    subject: "Some subject", // Subject line
    html: `<p>test</p>`, // plain text body
  };
  try {
    transporter.sendMail(mailOptions,function(err,info){
      if(err){
        console.log(err);
      }else{
        console.log(info);
      }
    });
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "something went wrong " + error.message});
  }
}