var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true },
  items: [ { type: Schema.ObjectId, ref: 'Item'} ]
});

module.exports = mongoose.model('Category', CategorySchema);
