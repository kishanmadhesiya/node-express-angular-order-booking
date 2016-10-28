var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');
var userservice=require('../controllers/api/users.controller');
var orderservice=require('../controllers/api/order.controller');
///* GET index page. */
//router.get('/', function(req, res,next) {
//  res.render('client_create',{title:'User Login'});
//});
//
//
//router.post('/', function (req, res) {    			  
//	console.log(req);
//	//res.render('client_create');
//});
//
// serve your app files from the '/app' route
//router.use('/', express.static('client'));
// make JWT token available to angular app
router.get('/token', function (req, res) {
    res.send(req.session.token);
});
//router.get('/dashboard', function (req, res) {
//    res.send(req.session.userid);
//});
//router.use('/dashboard', function(req,res){
//    res.render('dashboard');
//});
router.use('/', express.static('app'));

module.exports = router;