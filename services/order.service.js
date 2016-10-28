var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('item_details');
db.bind('users');
db.bind('order_details');

var service = {};

service.getItem = getAllitem;
service.saveItem = saveOrderitem;
service.getCurrentItem=getCurrentItem;
service.getPriceById=getPriceById;
service.getItemName=getItemName;
service.saveOrderFinal=saveOrderFinal;
module.exports = service;
function saveOrderFinal(data,_id) {
var deferred = Q.defer();
console.log(this);
db.order_details.insert({date:new Date(),details:data,timestamp:new Date()},function (err, doc) {
                                    if (err) {
                                      deferred.reject(err);  
                                    } else {
                                        db.users.update(
                            {_id: mongo.helper.toObjectID(_id)},
                            {$set:{cart:[]}});
                                        deferred.resolve(doc);
                                    }
                                });
                                return deferred.promise;
}
function getAllitem() {

    var deferred = Q.defer();

    db.item_details.find().toArray(function (err, item) {

        if (err)
            deferred.reject(err);

        if (item) {
            //  console.log(item);
            // return user (without hashed password)
            deferred.resolve(item);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
function getCurrentItem(_id) {

    var deferred = Q.defer();

    db.users.findOne({_id:mongo.helper.toObjectID(_id)},function (err, item) {

        if (err)
            deferred.reject(err);

        if (item) {
            var mainArr=[];
            for(i=0;i< item.cart.length;i++){
                
                mainArr.push({itemid:item.cart[i].itemid,quantity:item.cart[i].quantity,name:item.cart[i].name,price:item.cart[i].price});
            }
            deferred.resolve({data:mainArr});
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getPriceById(_id,quan){
     db.item_details.findOne({_id:mongo.helper.toObjectID(_id)}, function (err, data) {
        if (err) {
            return "NA";
        }else{
        if (data) {
            var total=quan*data.price;
             return total;
        } else {
            return "NA";
        }
    }
    });
}
function getItemName(_id){
     db.item_details.findOne({_id:mongo.helper.toObjectID(_id)}, function (err, data) {
        if (err) {
            return "NA";
        }else{
        if (data) {
            return data.name;
        } else {
            return "NA";
        }
    }
    });
}
function saveOrderitem(data, _id) {
    var deferred = Q.defer();
    var set1 = {
        
            "cart.$.itemid": data.itemid,
            "cart.$.quantity": data.quantity,
            "cart.$.price": data.price,
            "cart.$.name": data.name
    };
    var set = {
        "cart": {
            itemid: data.itemid,
            quantity: data.quantity,
            name:data.name,
            price:data.price
        }
    };
    db.users.findOne(
    {_id: mongo.helper.toObjectID(_id), "cart": {
    $elemMatch: {
    itemid: data.itemid
    }}},
            function (err, order_data) {
            if (err) {
                console.log("no")
                deferred.reject(err);
            } else {
                if (order_data) { 
                    
                    db.users.update(
                            {_id: mongo.helper.toObjectID(_id),
                                "cart": {
                                    $elemMatch: {
                                        itemid: data.itemid
                                    }
                                }
                            },
                            {$set: set1},
                            function (err, doc) {
                                if (err)
                                    deferred.reject(err);
                                if (doc) {
                                    deferred.resolve(doc);
                                } else {
                                    deferred.resolve();
                                }
                            });

                } else {
                    db.users.update(
                            {_id: mongo.helper.toObjectID(_id)},
                            {$push: set},
                            function (err, doc) {
                                if (err)
                                    deferred.reject(err);
                                if (doc) {

                                    deferred.resolve(doc);
                                } else {
                                    // user not found
                                    deferred.resolve();
                                }
                            });
                }
                }
            }
    );
            return deferred.promise;
}