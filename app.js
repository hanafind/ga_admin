const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const indexRouter = require('./src/routes/index');
const adminRouter = require('./src/routes/admin');
const apiRouter = require('./src/api/routes');

const config = require(`./config/${process.env.NODE_ENV}.json`);

const app = express();

const pgPool = new pg.Pool(config.postgresql);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use(expressSession({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'admin_sessions',   // Use another table-name than the default "session" one
    createTableIfMissing: true
  }),
  secret: '1234',
  resave: false,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 days
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(config.blog.upload_path));
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GA Potal Admin API",
      version: "1.0.0",
      description:
        "",
    }
  },
  apis: ["./src/api/routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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
