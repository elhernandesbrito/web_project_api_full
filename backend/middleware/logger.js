const winston = require('winston');
require('winston-daily-rotate-file');

// =========================
// Configuração geral
// =========================
const requestTransport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d', // mantém 14 dias de logs
});

const errorTransport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '30d', // mantém 30 dias de logs
});

// Logger para requisições
const requestLogger = winston.createLogger({
  transports: [requestTransport],
});

// Logger para erros
const errorLogger = winston.createLogger({
  transports: [errorTransport],
});

// Middleware: registrar requisições
const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
  });
  next();
};

// Middleware: registrar erros
const logErrors = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    status: err.statusCode || 500,
    stack: err.stack,
  });
  next(err); // segue para o errorHandler
};

module.exports = {
  requestLogger: logRequests,
  errorLogger: logErrors,
};
