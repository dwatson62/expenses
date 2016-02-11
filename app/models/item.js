var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category_id: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);
