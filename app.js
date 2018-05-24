const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('./app/config/general');
const cors = require('./app/config/cors');
const initConnection = require('./app/config/initConnection');



const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const authRouter = require('./app/routes/auth');
const donatorsRouter = require('./app/routes/donators');

const app = express();
app.use(cors)
app.use(passport.initialize())
require('./app/config/passport')(passport);
initConnection(config.database);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/donators', donatorsRouter);





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
