const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const errorHandler = require('./middleware/errorHandler');
const { errors } = require('celebrate');
const { validateSignup, validateSignin } = require('./middleware/validation');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

// -----------------------------
// Middlewares globais
// -----------------------------
app.use(cors());
app.use(express.json());

// Logger de requisições — SEMPRE antes das rotas
app.use(requestLogger);

// -----------------------------
// Conexão com o MongoDB
// -----------------------------
mongoose.connect('mongodb://127.0.0.1:27017/aroundbrazil')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// -----------------------------
// Controladores públicos
// -----------------------------
const { login, createUser } = require('./controllers/users');

// -----------------------------
// Rotas públicas (sem token)
// -----------------------------
app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

// -----------------------------
// Middleware de autorização
// -----------------------------
const auth = require('./middleware/auth');
app.use(auth);

// -----------------------------
// Rotas protegidas
// -----------------------------
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
// const cardsRouter = require('./routes/cards'); // será criado depois
// app.use('/cards', cardsRouter);

// -----------------------------
// Middlewares de erro
// -----------------------------
app.use(errorLogger);   // grava erros
app.use(errors());      // celebrate
app.use(errorHandler);  // resposta final padronizada

// -----------------------------
// Inicialização do servidor local
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
