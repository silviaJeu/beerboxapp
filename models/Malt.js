var mongoose = require('mongoose');

var MaltSchema = new mongoose.Schema({
  name: String,
  type: String,
  srm: {type: Number, default: 1},
  pg: String,
  mash: Boolean
});

mongoose.model('Malt', MaltSchema);

