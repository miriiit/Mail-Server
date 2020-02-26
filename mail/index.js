const nodemailer = require('nodemailer');
const config = require('../config');

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
});

exports.sendMail_Util = (attr, cb) => {
  let mailOptions = {
    from: config.mailUser, // Sender address
    to: attr.to,         // List of recipients
    subject: attr.subject, // Subject line
    html: attr.message_body
    /* attachments: [{
      filename: 'text1.txt',
      content: 'hello world!'
    }] */
  };
  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      cb(err);
    } else {
      cb(null, info);
    }
  });
};
