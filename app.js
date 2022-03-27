var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const route = require('./routes');

var app = express();


const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const productRouter = require('./routes/product');
const productDetailRouter = require('./routes/product_detail');
const signupRouter = require('./routes/signup');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signup', signupRouter);
app.use('/product_detail', productDetailRouter);
app.use('/product', productRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

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

app.use(express.static(path.join(__dirname, 'public')));

//route init

module.exports = app;
