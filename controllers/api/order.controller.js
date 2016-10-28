var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var orderService = require('../../services/order.service');
// routes
router.get('/allitems', allItems);
router.post('/saveorder', saveOrder);
router.get('/currentbook', getCurrentOrder);
router.post('/saveorderfinal', orderSave);

module.exports = router;

function allItems(req, res) {
    orderService.getItem()
        .then(function (item) {
            if (item) {
                res.send(item);
            } else {
                res.sendStatus(404);
            };
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function orderSave(req, res) {
    console.log(req.body)
    orderService.saveOrderFinal(req.body,req.session.userid)
        .then(function (item) {
            if (item) {
                res.send(item);
            } else {
                res.sendStatus(404);
            };
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getCurrentOrder(req, res) {
    orderService.getCurrentItem(req.session.userid)
        .then(function (item) {
            if (item) {
                res.send(item);
            } else {
                res.sendStatus(404);
            };
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function saveOrder(req, res) {
    
   orderService.saveItem(req.body,req.session.userid)
        .then(function (item) {
            if (item) {
                res.send(item);
            } else {
                res.sendStatus(404);
            };
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}