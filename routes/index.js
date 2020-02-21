const express = require("express");
const router = express.Router();
//const rateLimit = require('express-request-limit');
//const cors = require('cors');

const indexController = require ('../controller/indexController')
/* router.get("/",cors(corsOptionsDelegate),
                    rateLimit(rateLimitOpts),
                    indexController.index); */

router.get("/", indexController.index); 

module.exports = router;