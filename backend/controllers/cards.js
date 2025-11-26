const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Erro no servidor ao buscar cartões' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos para criação do cartão' });
      }
      return res.status(500).send({ message: 'Erro ao criar cartão' });
    });
}
function deleteCard(req, res) {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Cartão não encontrado' });
      }

      // Verificar se o usuário é o dono
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Você não pode deletar este cartão' });
      }

      // Se for dono, apagar
      return Card.findByIdAndDelete(cardId)
        .then(() => res.send({ message: 'Cartão deletado com sucesso' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de cartão inválido' });
      }
      return res.status(500).send({ message: 'Erro ao deletar cartão' });
    });
}

function getCardById(req, res) {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new Error('Cartão não encontrado'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Cartão não encontrado') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de cartão inválido' });
      }
      return res.status(500).send({ message: 'Erro ao buscar cartão' });
    });
}

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Cartão não encontrado'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de cartão inválido' });
      }
      if (err.message === 'Cartão não encontrado') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro ao curtir cartão' });
    });
}

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Cartão não encontrado'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de cartão inválido' });
      }
      if (err.message === 'Cartão não encontrado') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro ao descurtir cartão' });
    });
}

module.exports = {
  getCards, createCard, deleteCard, getCardById, likeCard, dislikeCard,
};