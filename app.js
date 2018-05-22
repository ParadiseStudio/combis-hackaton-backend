const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('./app/config/general');


const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const authRouter = require('./app/routes/auth');

const app = express();
app.use(passport.initialize())
require('./app/config/passport')(passport);
// console.log(config.database) 
mongoose.connect(config.database)
  .then(
    () => { console.log('Database connection established sucessfullly!') })
  .catch(
    err => {
      //maybe mongoDB container is slow to start
      await setTimeout(null, 3000);
      mongoose.connect(config.database)
        .then(
          () => { console.log('Database connection established sucessfullly!') })
        .catch(
          err => { throw err }
        )

    })



app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
  res.send(res.locals);
});

module.exports = app;
