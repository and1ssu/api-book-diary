const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};