/* const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter'); */

var fs = require('fs');
const mail = require('../mail');
const utility = require('../utility');
const config = require('../config');

exports.index = (req, res) => {
    res.render('mail/index', { title: 'Mail Delievery Page', action: "", message: "", response: true });
};
exports.SendMail_Get = (req, res) => {
    res.render('mail/mail-send', { title: 'Mail Delievery Page', action: "", message: "", response: true });
};
exports.SendMail_Post = (req, res, next) => {
    const { body } = req;
    try {
        fs.readFile('public/template/mail/mail-send.html', 'utf8', async (err, contents) => {

            if (err) {
                res.render('mail/mail-send', { action: "Error", title: 'Parsing Error', message: "Internal Error in Sending mail", response: false });
                res.status(404);
            }

            
            let res = await utility.ReplaceAttr(body, contents);
            let mailObj= {
                to: config.to,
                subject: config.subject,
                message_body : res
            }
            await mail.sendMail_Util(mailObj, (err, result) => {
                if (err) {
                    res.render('mail/mail-send', { action: "Error", title: 'Mail Delievery', message: "Gmail Transport Error", response: false });
                    res.status(404);
                    return;
                }
                if (result) { // No results.
                    res.render('mail/mail-send', { action: "Success", title: 'Mail Delievery', message: "Successfully delieved", response: true, size: result.length, data: result });
                    res.status(200);
                }
                else { // No results.
                    res.render('mail/mail-send', { action: "Error", title: 'Mail Delievery', message: "Internal Error in Sending mail", response: false });
                    res.status(404);
                }
            });



            console.log(contents);
            let attr = contents;
        });
    } catch (ex) {
        let err = new Error('Exception: Mail Delievery!');
        err.status = 404;
        res.send(err).status(404);
    }

};
