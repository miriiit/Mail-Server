const express = require("express");
const router = express.Router();

//const rateLimit = require('express-request-limit');

var {validate_req_body_sendMail} = require('../middlewares/validate');

var mailController = require('../controller/mailController');
//var {corsOptionsDelegate, rateLimitOpts } = require('../middlewares/options.js');
//const cors = require('cors');

/* router.get('/',cors(corsOptionsDelegate),
               rateLimit(rateLimitOpts),
               feedController.index); */


               
router.get('/', mailController.index);
router.get('/send', mailController.SendMail_Get);
//router.post('/send', validate_req_body_sendMail, mailController.SendMail_Post);
router.post('/send', mailController.SendMail_Post);
module.exports = router;