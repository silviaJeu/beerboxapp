var mongoose = require('mongoose');

var MiscSchema = new mongoose.Schema({
  name: String,
  type: String,
  use: String
});

mongoose.model('Misc', MiscSchema);
