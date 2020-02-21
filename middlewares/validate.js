const Joi = require('joi');

//options for cors
const validate_req_body_sendMail = (req, res, next) => {
    const schema = Joi.object({
        to: Joi.required(),
        //product_name: Joi.string().required(),
        subject: Joi.required(),
        message_body: Joi.required()
    }).options({ allowUnknown: true });

    const { body } = req;
    const result = Joi.validate(body, schema);


    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        return res.status(422).json({
            message: 'Invalid parameter',
            data: body
        })
    }else{
        return next()
    }
  };


  module.exports={validate_req_body_sendMail};