var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  amount: Number
});

module.exports = mongoose.model('Item', ItemSchema);
