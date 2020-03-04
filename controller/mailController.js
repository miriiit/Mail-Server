/* const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter'); */

var fs = require('fs');
const mail = require('../mail');
const utility = require('../utility');
const config = require('../config');

exports.index = (req, res) => {
    res.render('mail/index', {
        title: 'Mail Delievery Page',
        action: "",
        message: "",
        response: true
    });
};
exports.SendMail_Get = (req, res) => {
    res.render('mail/mail-send', {
        title: 'Mail Delievery Page',
        action: "",
        message: "",
        response: true
    });
};
exports.SendMail_Post = (req, res, next) => {
    const {
        body
    } = req;
    try {
        fs.readFile('mail-server/public/template/mail/mail-send.html', 'utf8', async (err, contents) => {

            if (err) {
                res.send({
                    action: "Error",
                    title: 'Parsing Error',
                    message: "Internal Error in Sending mail",
                    response: false
                });
                res.status(404);
                return false;
            }
            let parsedBody = await utility.ReplaceAttr(body, contents);

            let mailObj = {
                to: config.to,
                subject: config.subject,
               
            }

            if(config.mailAOFAsAttachment){
                mailObj = {...mailObj, attachment: true,   message_body: 'Kindly Find Attachments For Aof Form.',  attacmentFileName: 'AOF_Form.html', attachmentContent: parsedBody }
            }else{
                mailObj = {...mailObj, attachment: false,   message_body: parsedBody };
            }

            try {
                let result = await mail.sendMail_Util(mailObj);
                if (result) {
                    // if (err) {
                    //     res.send({
                    //         action: "Error",
                    //         title: 'Mail Delievery',
                    //         message: "Gmail Transport Error",
                    //         response: false
                    //     });
                    //     res.status(404);
                    //     return;
                    // }
                    res.send({
                        action: "Success",
                        title: 'Mail Delievery',
                        message: "Successfully delieved",
                        response: true,
                        size: result.length,
                        data: result
                    });
                    res.status(200);

                    //console.log(contents);
                    //let attr = contents;
                } else { // No results.
                    res.send({
                        action: "Error",
                        title: 'Mail Delievery',
                        message: "Internal Error in Sending mail",
                        response: false
                    });
                    res.status(404);
                }
            } catch (ex) {
                let err = new Error('Exception: Mail Delievery!');
                err.status = 404;
                res.send(err).status(404);
            }
        });
    } catch (ex) {
        let err = new Error('Exception: Mail Delievery!');
        err.status = 404;
        res.send(err).status(404);
    }

};
