const express = require('express');
const router = express.Router();

const {
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateAvatar, validateUpdateUser } = require('../middleware/validation');

// =============================
// Rotas de usuários
// =============================

// Obter dados do usuário logado
router.get('/me', getCurrentUser);

// Atualizar name e about
router.patch('/me', updateUser);

// Atualizar avatar
router.patch('/me/avatar',validateAvatar, updateAvatar);

router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
