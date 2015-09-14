var mongoose = require('mongoose');

var StyleSchema = new mongoose.Schema({
	id: String,
	name: String,
	og: String,
	fg: String,
	ibu: String,
	srm: String,
	abv: String
});

mongoose.model('Style', StyleSchema);
