var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  items: [ {type : mongoose.Schema.ObjectId, ref : 'Item'} ]
});

module.exports = mongoose.model('Category', CategorySchema);
