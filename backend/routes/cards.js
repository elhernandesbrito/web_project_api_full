const express = require('express');
const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../middleware/validation');

// =============================
// Rotas de cards
// =============================

// Listar cards
router.get('/', getCards);

// Criar card
router.post('/', validateCreateCard, createCard);

// Deletar card por id
router.delete('/:cardId', validateCardId, deleteCard);

// Curtir card
router.put('/:cardId/likes', validateCardId, likeCard);

// Remover curtida
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
