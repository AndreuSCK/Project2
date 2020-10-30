require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const DBQuestions = require('./models/dbquestions');
const questionsData = require('./seed/questions');


const favicon = require('serve-favicon');
const mongoose = require('mongoose');
// https://ih-quizapp.herokuapp.com/
// `mongodb://localhost/project2`
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })

  .catch(err => {
    console.error('Error connecting to mongo', err);
  })


DBQuestions.countDocuments((err, count) => {
  if (count === 0) {
    DBQuestions.create(questionsData);
  }
});
const authRouter = require('./routes/auth');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware Setup

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// Routers


app.use('/', authRouter);

// app.use('/', indexRouter);









// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
