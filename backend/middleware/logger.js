const winston = require('winston');
require('winston-daily-rotate-file');

// =========================
// Transports
// =========================
const requestTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '30d',
});

// =========================
// Loggers (JSON format)
// =========================
const requestLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [requestTransport],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [errorTransport],
});

// =========================
// Middlewares
// =========================
const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
  });
  next();
};

const logErrors = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    status: err.statusCode || 500,
    stack: err.stack,
  });
  next(err);
};

module.exports = {
  requestLogger: logRequests,
  errorLogger: logErrors,
};
