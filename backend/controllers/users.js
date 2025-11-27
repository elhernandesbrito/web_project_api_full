const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ===============================
//  Criar usuário (signup)
// ===============================
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error('O email já está cadastrado');
        err.statusCode = 409;
        return next(err);
      }

      // Criptografando a senha
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => {
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;

          return res.status(201).send(userWithoutPassword);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            err.statusCode = 400;
            err.message = 'Dados inválidos ao criar usuário';
          }
          return next(err);
        });
    })
    .catch(next);
};

//  Login (signin)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Email ou senha incorretos');
        err.statusCode = 401;
        return next(err);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new Error('Email ou senha incorretos');
            err.statusCode = 401;
            return next(err);
          }

          const token = jwt.sign(
            { _id: user._id },
            'secret-key', // será substituído no deploy
            { expiresIn: '7d' },
          );

          return res.send({ token });
        });
    })
    .catch(next);
};


//  Buscar usuário logado /users/me
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error('Usuário não encontrado');
        err.statusCode = 404;
        return next(err);
      }
      return res.send(user);
    })
    .catch(next);
};


//  Atualizar dados do usuário
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Usuário não encontrado');
        err.statusCode = 404;
        return next(err);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Dados inválidos ao atualizar perfil';
      }
      return next(err);
    });
};

//  Atualizar avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Usuário não encontrado');
        err.statusCode = 404;
        return next(err);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'URL de avatar inválida';
      }
      return next(err);
    });
};
