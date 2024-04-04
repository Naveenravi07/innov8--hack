var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("express-handlebars")
var adminRouter = require('./routes/admin.js');
var usersRouter = require('./routes/users');
let { connectDb } = require("./db/mongo.connection.js")
var session =require("express-session");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var handlebarsInstance = hbs.create({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        inc: function(value, options) {
            return parseInt(value) + 1;
        }
    }
});
app.engine('hbs', handlebarsInstance.engine);
app.use(session({secret:"key",cookie:{maxAge:300000}}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/admin', adminRouter);

app.listen(3000, async () => {
    await connectDb()
        .then((res)=>console.log(" Db connection Success"))
        .catch((err) => console.log("Db connection failed"))
})

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
