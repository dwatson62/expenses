var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

router.get('/clear', function(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connection.db.dropDatabase(function(err, result) {
      if (err) {
        console.log(err);
        res.json({ 'message': 'There was an error' });
      } else {
        console.log('Success');
        console.log(result);
        res.redirect('/');
      }
    });
  } else {
    res.json({ 'message': 'Cannot drop development database' });
  }
});

module.exports = router;
