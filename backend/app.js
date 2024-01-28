const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const swaggerOptions = require('./swagger');
const registration  = require('./routes/auth/registration');
const login  = require('./routes/auth/login');
const userInfo  = require('./routes/userInfo');

const app = express();

// Настройка Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Настройка логирования, парсинга тел запросов и обработки CORS
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Настройка роутов
app.use('/api', indexRouter.router);
app.use('/api', registration.router);
app.use('/api', login.router);
app.use('/api', userInfo.router);

// Обработка 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Обработчик ошибок
app.use(function(err, req, res, next) {
  // Локальные переменные, предоставляющие ошибку только в режиме разработки
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Рендер страницы ошибки
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
