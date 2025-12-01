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

// =============================
// Validação do createCard (POST /cards)
// =============================
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// =============================
// Validação do cardId (params)
// =============================
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

// =============================
// Validação do updateUser (PATCH /users/me)
// =============================
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});



module.exports = {
  validateSignup,
  validateSignin,
  validateAvatar,
  validateCreateCard,
  validateCardId,
  validateUpdateUser
};
