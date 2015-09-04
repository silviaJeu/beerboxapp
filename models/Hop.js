var mongoose = require('mongoose');

var HopSchema = new mongoose.Schema({
  name: String,
  type: String,
  alfa: {type: Number},
  origin: String
});

mongoose.model('Hop', HopSchema);

