var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require('path');

var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://localhost/expenses_' + process.env.NODE_ENV;

var Item = require('./app/models/item.js');
var Category = require('./app/models/category.js');

mongoose.connect(mongoUri, function(err) {
  if (err) {
    console.log('Connection error:', err);
  } else {
    console.log('Connection to ' + process.env.NODE_ENV + ' database was successful!');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/app'));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

var categories = require('./app/routes/categories.js');
var items = require('./app/routes/items.js');
var index = require('./app/routes/index.js');
var specs = require('./app/routes/specs.js');

app.use('/', index);
app.use('/api', categories);
app.use('/api', items);
app.use('/specs', specs);

app.listen(port);
console.log('Magic happens on port ' + port);
