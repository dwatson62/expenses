var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/category.js');
var Item = require('../models/item.js');

var attributes = ['amount', 'name'];

var updateItemAttributes = function(item, params) {
  attributes.forEach(function(attribute) {
    if (params[attribute]) {
      item[attribute] = params[attribute];
      item.save();
    }
  });
};

router.post('/item', function(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) { return next(err); }
    updateItemAttributes(item, req.body);
    Category.find({ 'name': req.body.category }, function(err, category) {
      if (err) { return next(err); }
      category[0].items.addToSet(item);
      category[0].save(function(err) {
        if (err) { return next(err); }
      });
      console.log(item.name + ' was created in ' + category[0].name + '!');
      res.json(item);
    });
  });
});

router.get('/item/:id', function(req, res, next) {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      next(err);
    } else if (item) {
      res.json(item);
    } else {
      console.log('Item not found!');
      next();
    }
  });
});

router.put('/item/:id', function(req, res, next) {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      next(err);
    } else if (item) {
      updateItemAttributes(item, req.body);
      res.json(item);
    } else {
      console.log('Item not found!');
      next();
    }
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
    if (err) {
      next(err);
    } else if (item) {
      res.json({ message: item.name + ' deleted!' });
    } else {
      console.log('Item not found!');
      next();
    }
  });
});

module.exports = router;
