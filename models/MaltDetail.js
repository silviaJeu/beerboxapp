var mongoose = require('mongoose');

var MaltDetailSchema = new mongoose.Schema({
	maltid: String,
	origin: String,
	supplier: String,
	dryyield: {type: Number, default: 1},
	coarse: {type: Number, default: 1},
	moisture: {type: Number, default: 1},
	afterBoil: Boolean,
	diastatic: {type: Number, default: 1},
	protein: {type: Number, default: 1}
});

mongoose.model('MaltDetail', MaltDetailSchema);

