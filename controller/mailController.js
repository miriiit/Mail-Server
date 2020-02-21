/* const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter'); */

const mail = require('../mail');

exports.index = (req, res) => {
    res.render('mail/index', {title: 'Mail Delievery Page', action:"", message:"", response: true});
};
exports.SendMail_Get = (req, res) => {
    res.render('mail/mail-send', {title: 'Mail Delievery Page', action:"", message:"", response: true});
};
exports.SendMail_Post = async (req, res, next) => {
    const { body } = req;
    try {
         await mail.sendMail_Util(body, (err, result) => {
            if (err) {
                res.render('mail/mail-send', {action:"Error", title: 'Mail Delievery', message:"Gmail Transport Error", response: false});
                res.status(404);
                return;
            }
            if (result) { // No results.
                res.render('mail/mail-send', {action:"Success", title: 'Mail Delievery',message:"Successfully delieved", response: true, size: result.length, data: result });
                res.status(200);
            }
            else { // No results.
                res.render('mail/mail-send', {action:"Error", title: 'Mail Delievery',message:"Internal Error in Sending mail", response: false});
                res.status(404);
            }
        }); 

        res.render('mail/mail-send', {action:"Success", title: 'Mail Delievery',message:"Form posted", response: false, data:body});
        res.status(200);
    } catch (ex) {
        let err = new Error('Exception: Mail Delievery!');
        err.status = 404;
        res.send(err).status(404);
    }

};
