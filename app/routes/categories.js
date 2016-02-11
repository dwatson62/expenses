var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/category.js');
var Item = require('../models/item.js');

var buildCategory = function(params) {
  return new Category({
    name: params.name
  });
};

router.post('/category', function(req, res, next) {
  var newCategory = buildCategory(req.body);
  newCategory.save(function(err) {
    if (err) { return next(err); }
    console.log(newCategory.name + ' was created!');
    res.json(newCategory);
  });
});

router.get('/category/:id', function(req, res, next) {
  Category.findById(req.params.id, function(err, category) {
    if (err) {
      next(err);
    } else if (category) {
      res.json(category);
    } else {
      console.log('Category not found!');
      next();
    }
  });
});

router.put('/category/:id', function(req, res, next) {
  Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, function(err, category) {
    if (err) {
      next(err);
    } else if (category) {
      Category.findById(req.params.id)
        .populate('items')
        .exec(function(err, category) {
          res.json({ category });
        });
    } else {
      console.log('Category not found!');
      next();
    }
  });
});

router.get('/category/:id/items', function(req, res, next) {
  Category.findById(req.params.id)
    .populate('items')
    .exec(function(err, category) {
      res.json({ category });
    });
});

router.get('/categories/items', function(req, res, next) {
  Category.find()
    .populate('items')
    .exec(function(err, categories) {
      res.json({ categories });
    });
});

router.get('/categories', function(req, res) {
  Category.find(function(err, categories) {
    if (err) { return next(err); }
    res.json({ categories });
  });
});

router.delete('/category/:id', function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, function(err, category) {
    if (err) {
      next(err);
    } else if (category) {
      res.json({ message: category.name + ' deleted!' });
    } else {
      console.log('Category not found!');
      next();
    }
  });
});

module.exports = router;
