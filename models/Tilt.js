var mongoose = require('mongoose');

var TiltSchema = new mongoose.Schema({
  Timepoint: String,
  Temp: String,
  SG: String,
  Beer: String,
  Color: String,
  Comment: String,
  id: String
});

mongoose.model('Tilt', TiltSchema);

