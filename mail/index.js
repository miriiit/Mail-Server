const nodemailer = require('nodemailer');
const config = require('../config');

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
});

exports.sendMail_Util = (body, cb) => {
  let mailOptions = {
    from: config.mailUser, // Sender address
    to: body.to,         // List of recipients
    subject: body.subject, // Subject line
    html: body.message_body
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
