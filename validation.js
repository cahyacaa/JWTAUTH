const Joi = require("@hapi/joi");


const loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    // password: Joi.string().min(0).max(1024).required(),
  });
  return schema.validate(data);
};

const registValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    jenis_kelamin: Joi.string().min(0).max(1024).required(),
  });
  return schema.validate(data);
};
module.exports = {
  registValidation,  
};
