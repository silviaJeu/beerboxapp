var mongoose = require('mongoose');

var YeastSchema = new mongoose.Schema({
  name: String,
  type: String,
  lab: String,
	prodId: String,
	form: String,
	tempRange: String,
	attenuation: String
});

mongoose.model('Yeast', YeastSchema);

