var mongoose = require('mongoose');

var YeastSchema = new mongoose.Schema({
  name: String,
  type: String,
  lab: String,
  prodId: String,
  form: String,
  rangeT: String,
  attenuation: String,
  weight: {type: Number}
});

mongoose.model('Yeast', YeastSchema);

