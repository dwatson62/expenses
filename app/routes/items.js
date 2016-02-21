var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/category.js');
var Item = require('../models/item.js');

var attributes = ['amount', 'name', 'category_id'];

var updateItemAttributes = function(item, params) {
  attributes.forEach(function(attribute) {
    if (params[attribute]) {
      item[attribute] = params[attribute];
    }
  });
};

var buildItem = function(params, category) {
  return new Item({
    name: params.name,
    amount: params.amount,
    category_id: category
  });
};

router.post('/item', function(req, res, next) {
  if (req.body.category_id === undefined) { return next(); }
  Category.findById(req.body.category_id, function(err, category) {
    if (err) { return next(err); }
    var newItem = buildItem(req.body, category.id);
    newItem.save(function(err) {
      if (err) { return next(err); }
      category.items.addToSet(newItem)
      category.save(function(err) {
        if (err) { return next(err); }
        console.log(newItem.name + ' was created in ' + category.name + '!');
        res.json(newItem);
      });
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
  Item.findByIdAndUpdate(req.params.id, { 'name': req.body.name, 'amount': req.body.amount }, function(err) {
    if (err) {
      next(err);
    } else if (!err) {
      Item.findById(req.params.id, function(err, updatedItem) {
        res.json(updatedItem);
      });
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
