var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/category.js');
var Item = require('../models/item.js');

router.post('/item', function(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) { return next(err); }
    item.name = req.body.name;
    item.price = req.body.price;
    console.log(item.name + ' was created!');
    res.json(item);
  });
});

router.get('/item/:id', function(req, res, next) {
  Item.findById(req.params.id, function(err, item) {
    if (err) { return next(err); }
    res.json(item);
  });
});

router.get('/items', function(req, res) {
  Item.find(function(err, items) {
    if (err) { return next(err); }
    res.json({ items });
  });
});

router.delete('/item/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    if (err) { return next(err); }
    res.json({ message: item.name + ' deleted!' });
  });
});

module.exports = router;
