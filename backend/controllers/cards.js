const Card = require('../models/card');

// =============================
// Criar card
// POST /cards
// =============================
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos para criar card' });
      }
      return next(err);
    });
};

// =============================
// Listar cards
// GET /cards
// =============================
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// =============================
// Deletar card
// DELETE /cards/:cardId
// =============================
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card não encontrado' });
      }

      // Verifica se o usuário é dono do card
      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: 'Você não pode excluir cards de outros usuários' });
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.send({ message: 'Card deletado' }));
    })
    .catch(next);
};

// =============================
// Curtir card
// PUT /cards/:cardId/likes
// =============================
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card não encontrado' });
      }
      return res.send(card);
    })
    .catch(next);
};

// =============================
// Remover curtida
// DELETE /cards/:cardId/likes
// =============================
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card não encontrado' });
      }
      return res.send(card);
    })
    .catch(next);
};
