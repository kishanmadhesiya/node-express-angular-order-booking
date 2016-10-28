//-----Express--By----Kishan-----
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongodb = require('mongoskin');
var expressJwt = require('express-jwt');
var Q = require('q');
var nodemailer = require('nodemailer');
var cron = require('node-cron');
var jwt = require('jsonwebtoken');
var app = express();
var config = require('./config.json');
var userservice = require('./controllers/api/users.controller');
var orderservice=require('./controllers/api/order.controller');
var request = require('request');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
var db = mongodb.db(config.connectionString, {native_parser: true});
db.bind('users');
//app.set('view engine', 'ejs');
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');
//app.use('/api', expressJwt({secret: config.secret}).unless({path: ['/api/users/authenticate', '/api/users/register']}));
var routes = require('./routes/routes');
app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));


////------Router--------------
app.use('/assets/', express.static(__dirname + '/vendor/'));
app.set('views', __dirname + '/views/');
////-----------------------Login------------------
app.use('/api/users/', userservice);
app.use('/api/order/', orderservice);
app.use('/', routes);
app.use('/app', routes);
app.post('/auth/google', function (req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "Nxems5nXHDpbJ9JNG64TY4x6",
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
        var accessToken = token.access_token;
        var headers = {Authorization: 'Bearer ' + accessToken};
        req.session.token = accessToken;
        // Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
            var deferred = Q.defer();
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                db.users.findOne({sub: profile.sub}, function (err, existingUser) {
                    if (existingUser) {
                        req.body.sub = existingUser._id;
                        deferred.resolve(jwt.sign({ sub: existingUser._id }, config.secret));
                        db.users.update(
                                {_id: existingUser._id},
                                {$set: {'hash':accessToken,'timestamp':new Date()}},
                                function (err, doc) {
                                    if (err){
                                        
                                    }else{
                                        var user={};
                                        req.session.userid =existingUser._id;
                                        return res.send(accessToken);
                                    }
                                });
                    } else {
                        profile.hash = accessToken;
                        db.users.insert(
                                profile,
                                function (err, doc) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(doc);
                                        req.session.userid =doc.ops[0]._id;
                                        return res.send(accessToken);
                                    }
                                });
                    }

                });
            } else {
                profile.hash = accessToken;
                        db.users.insert(
                                profile,
                                function (err, doc) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        req.session.userid =doc.ops[0]._id;
                                        return res.send(accessToken);
                                    }
                                });
                // Step 3b. Create a new user account or return an existing one.
                return res.send(accessToken);
            }
        });
    });
});
//app.use('/check_login',routesLogin);
////---------------------Login End-----------------
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//---------Server Start-----------
cron.schedule('0 30 12 * * 1-5', function(){
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'kishanmadhesiya@gmail.com',
        pass: 'YourPassword'
    }
});
var mailOptions = {
    from: 'kishanmadhesiya@gmail.com', // sender address
    to: 'kishan@cybuzzsc.com', // list of receivers
    subject: 'CybuzzSC Book Your Order', // Subject line
//    text:  //, // plaintext body
     html: 'Hi Kishan,<br><br>Please Click The Link To Book Your Order.<br><br><a href="localhost:3000">Book Now</a><br><br>Regards,<br><br>Cybuzz Online Food' // You can choose to send an HTML body instead
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    };
});
  console.log('running a task every minute');
});
app.listen(3000, function () {
    console.log('Kishan Your Server is Running On Port 3000!');
});
