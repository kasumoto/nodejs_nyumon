var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//sessionの設定
var session =require('express-session');
var session_opt = {
  secret: 'keyboard vat',//秘密キー
  resave: false,//セッションストアに値を強制保存
  saveUnittialized: false,
  cookie: { maxAge: 60 * 60 * 1000} //セッションの保持時間
};
//var jquery = require('express-jquery');
var ajax = require('./routes/ajax');
var validator = require('express-validator');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.useで利用する文は、ルーティングのためのapp.useよりも前に書く
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(session_opt));
//app.use(jquery('/jquery'));
app.use('/ajax', ajax);
app.use(validator());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello',hello);


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
