var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongoose=require('mongoose');
var appRoutes = require('./routes/app');
var userRoutes=require('./routes/users');
var itemRoutes=require('./routes/items');
var commentRoutes=require('./routes/comments');
var googleRoutes=require('./routes/google');
var rssRoutes=require('./routes/rss');
var dbRoutes=require('./routes/database');
var app = express();
mongoose.connect('localhost:27017/final-project');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


/**
 * Routings
 */
app.use('/item',itemRoutes);
app.use('/user',userRoutes);
app.use('/comment',commentRoutes);
app.use('/google-maps',googleRoutes);
app.use('/rss',rssRoutes);
app.use('/db',dbRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
