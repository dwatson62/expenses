var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/expenses';

var Item = require('./app/models/item.js');
var Category = require('./app/models/category.js');

mongoose.connect(mongoUri, function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var categories = require('./app/routes/categories.js');
var items = require('./app/routes/items.js');

app.use('/api', categories);
app.use('/api', items);

app.listen(port);
console.log('Magic happens on port ' + port);
