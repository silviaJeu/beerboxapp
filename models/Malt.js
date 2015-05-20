var mongoose = require('mongoose');

var MaltSchema = new mongoose.Schema({
  name: String,
  type: String,
  srm: {type: Number, default: 1},
	pg: String,
	mash: Boolean
});

/*
PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
*/
mongoose.model('Malt', MaltSchema);

