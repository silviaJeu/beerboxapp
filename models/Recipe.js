var mongoose = require('mongoose');
	
var RecipeSchema = new mongoose.Schema({
	user: String,
	name: String,
	type: String,
	og: {type: Number, default: 1000},
	fg: {type: Number, default: 1000},
	ibu: {type: Number, default: 0},
	srm: {type: Number, default: 0},
	abv: {type: Number, default: 0},
	efficiency: {type: Number, default: 75},
	size: {type: Number, default: 25},
	sizePb: {type: Number, default: 25},
	malts:	[
	      	 	{
	      	 		id: String,
	      	 		name: String,
	      	 		qty: {type: Number, default: 0}
	      	 	}
	       ],
   hops:	[
        	 	{
        	 		id: String,
        	 		name: String,
        	 		formatType: String,
        	 		minutes: {type: Number, default: 0},
        	 		step: String,
        	 		qty: {type: Number, default: 0}, 
        	 		alfa: {type: Number, default: 0}
        	 	}
        	 ],
   yeasts:	[
          	 	{
          	 		id: String,
          	 		name: String,
          	 		qty: {type: Number, default: 0}
          	 	}
          	],
   miscs:	[
	       	 	{
	       	 		id: String,
	       	 		name: String,
	       	 		qty: {type: Number, default: 0}
	       	 	}
	       	],
   style: 	{
				id: String,
				name: String,
				og: String,
				fg: String,
				ibu: String,
				srm: String,
				abv: String
   			}
          	 
  
});
	
mongoose.model('Recipe', RecipeSchema);

