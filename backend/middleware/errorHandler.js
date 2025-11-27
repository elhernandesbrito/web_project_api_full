
module.exports = (err, req, res, next) => {
  console.error("💥 ERRO CAPTURADO:", err);

  // Se o erro já tiver um statusCode, usamos ele
  const statusCode = err.statusCode || 500;

  // Mensagem padrão para erro inesperado
  const message = statusCode === 500
    ? "Ocorreu um erro no servidor"
    : err.message;

  res.status(statusCode).send({ message });
};
