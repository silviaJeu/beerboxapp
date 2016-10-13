var mongoose = require('mongoose');

var HopSchema = new mongoose.Schema({
  name: String,
  type: String,
  alfa: {type: Number},
  oil: {type: Number},
  aroma: String,
  noble: Boolean,
  origin: String
});

mongoose.model('Hop', HopSchema);

