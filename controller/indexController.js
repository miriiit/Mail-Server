//const { body,validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');

exports.index =  (req, res) => {
  res.send("Welcome Mail Controller").status(200);
};
exports.invalid404 = (req, res) =>{
  res.send("Page not found!").status(404);
}
