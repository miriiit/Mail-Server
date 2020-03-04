const nodemailer = require('nodemailer');
const config = require('../config');

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
});

exports.sendMail_Util = (attr) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: config.mailUser, // Sender address
      to: attr.to, // List of recipients
      subject: attr.subject // Subject line
    };

    if(attr.attachment)
    {
      //Object.assign({}, mailOptions, {filename: 'blue'});
      mailOptions = {...mailOptions,  text: attr.message_body,  attachments: [{ filename: attr.attacmentFileName, content: attr.attachmentContent, contentType: 'text/html charset=UTF-8'}]};
    }else{
      mailOptions = {...mailOptions,  html: attr.message_body};
    }
    
    if (!mailOptions) {
      reject("Not Valid Config For mail send");
    } else {
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    }
  })
};
