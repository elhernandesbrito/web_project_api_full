const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Função personalizada para validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// =============================
// Validação do signup
// =============================
const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().custom(validateURL),
  }),
});

// =============================
// Validação do signin
// =============================
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// =============================
// Validação do updateAvatar (PATCH /users/me/avatar)
// =============================
const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateAvatar
};
