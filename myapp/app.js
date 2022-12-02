var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入express-session  登录用户信息验证
var session = require('express-session');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.engine('html', require('express-art-template'));
app.set('views', {
  debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 配置session ，需要在路由之前
app.use(session({
  secret: 'rookie',
  name: 'rookie.sid',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    // domain: 'xxx.xxx.xxx.xxx:xxxx', // 域名
    path: '/',
    httpOnly: true,
    maxAge: 1000*60*60
  }
}));


app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
