const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

 if (!authorization || !authorization.startsWith('Bearer ')) {
  return res.status(403).send({ message: 'Autorização necessária' });
}

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'secret-key'); // será substituído no deploy
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  req.user = payload;

  return next();
};
