const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'URL do avatar inválida',
    },
  },
  email: {
    type: String,
    required: [true, 'O campo email é obrigatório'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email inválido',
    },
  },
  password: {
    type: String,
    required: [true, 'O campo senha é obrigatório'],
    select: false, // Não retorna por padrão
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
