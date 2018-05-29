var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose');

// malts routing
var Malt = require('./../models/Malt.js');
Malt = mongoose.model('Malt');

router.get('/malts', function(req, res, next) {
  Malt.find(function(err, malts){
    if(err){ return next(err); }

    res.json(malts);
  });
});

router.post('/malts', function(req, res, next) {
  var malt = new Malt(req.body);

  malt.save(function(err, malt){
    if(err){ return next(err); }

    res.json(malt);
  });
});

router.param('malt', function(req, res, next, id) {
  var query = Malt.findById(id);
  
  query.exec(function (err, malt){
    if (err) { return next(err); }
    if (!malt) { return next(new Error('can\'t find malt')); }

    req.malt = malt;
    return next();
  });
});

router.get('/malts/:malt', function(req, res) {
  res.json(req.malt);
});

//router.put('/malts/:malt', function(req, res, next) {
//	var malt = new Malt(req.body);
//	Malt.findByIdAndUpdate(req.malt._id, malt, function(err, result) {
//		if(err){
//			console.log("Error: "+err);
//			return next(err); 
//		}
//		res.json(result);
//	});	
//});
//
router.put('/malts', function(req, res, next) {
	var malt = new Malt(req.body);
	Malt.findByIdAndUpdate(req.body._id, malt, function(err, result) {
		if(err){
			console.log("Error: "+err);
			return next(err); 
		}
		res.json(malt);
	});	
});

router.delete('/malts', function(req, res, next) {
	var malt = new Malt(req.body);
	
	malt.remove(function(err, malt){
		if(err){ return next(err); }
	    res.json(malt);
	});
});

// hops routing
var Hop = require('./../models/Hop.js');
Hop = mongoose.model('Hop');

router.get('/hops', function(req, res, next) {
  Hop.find(function(err, hops){
    if(err){ return next(err); }

    res.json(hops);
  });
});


router.post('/hops', function(req, res, next) {
  var hop = new Hop(req.body);

  hop.save(function(err, hop){
    if(err){ return next(err); }

    res.json(hop);
  });
});

router.param('hop', function(req, res, next, id) {
  var query = Hop.findById(id);

  query.exec(function (err, hop){
    if (err) { return next(err); }
    if (!hop) { return next(new Error('can\'t find hop')); }

    req.hop = hop;
    return next();
  });
});

router.get('/hops/:hop', function(req, res) {
  res.json(req.hop);
});

//yeasts routing
var Yeast = require('./../models/Yeast.js');
Yeast = mongoose.model('Yeast');

router.get('/yeasts', function(req, res, next) {
  Yeast.find(function(err, yeasts){
    if(err){ return next(err); }

    res.json(yeasts);
  });
});

router.post('/yeasts', function(req, res, next) {
  var yeast = new Yeast(req.body);

  yeast.save(function(err, yeast){
    if(err){ return next(err); }

    res.json(yeast);
  });
});

router.param('yeast', function(req, res, next, id) {
	  var query = Yeast.findById(id);
	  query.exec(function (err, yeast){
	    if (err) { return next(err); }
	    if (!yeast) { return next(new Error('can\'t find yeast')); }
		req.yeast = yeast;
		return next();
	  });
});

router.get('/yeasts/:yeast', function(req, res) {
	res.json(req.yeast);
});

//recipes routing	
var Recipe = require('./../models/Recipe.js');
Recipe = mongoose.model('Recipe');

router.get('/recipes', function(req, res, next) {
	Recipe.find({}).sort('-creationDate').exec(function(err, recipes) {
		if(err){ return next(err); }
		res.json(recipes);
	});	
});

router.post('/recipes', function(req, res, next) {
  var recipe = new Recipe(req.body);

  recipe.save(function(err, recipe){
    if(err){ return next(err); }

    res.json(recipe);
  });
});

router.param('recipe', function(req, res, next, id) {
  var query = Recipe.findById(id);

  query.exec(function (err, recipe){
    if (err) { return next(err); }
    if (!recipe) { return next(new Error('can\'t find recipe')); }

    req.recipe = recipe;
    return next();
  });
});

router.get('/recipes/:recipe', function(req, res) {
  res.json(req.recipe);
});

router.put('/recipes', function(req, res, next) {
	var recipe = new Recipe(req.body);
	Recipe.findByIdAndUpdate(req.body._id, recipe, function(err, result) {
		if(err){
			console.log("Error: "+err);
			return next(err); 
		}
		res.json(recipe);
	});	
});

router.delete('/recipes/:recipe', function(req, res, next) {
	var recipe = new Recipe(req.recipe);
	recipe.remove(function(err, recipe){
    if(err){ return next(err); }

    res.json(recipe);
  });
});

// beerStyle routing
var Style = require('./../models/Style.js');
Style = mongoose.model('Style');

router.get('/styles', function(req, res, next) {
	Style.find(function(err, styles){
    if(err){ return next(err); }

    res.json(styles);
  });
});

//Person.findOne({ 'name.last': 'Ghost' });
router.param('style', function(req, res, next, id) {
  var query = Style.findOne({ 'id': id });

  query.exec(function (err, style){
    if (err) { return next(err); }
    if (!style) { return next(new Error('can\'t find style')); }

    req.style = style;
    return next();
  });
});

router.get('/styles/:style', function(req, res) {
  res.json(req.style);
});
	
// misc routing
var Misc = require('./../models/Misc.js');
Misc = mongoose.model('Misc');

router.get('/miscs', function(req, res, next) {

	Misc.find(function(err, miscs){
    if(err){ return next(err); }

    res.json(miscs);
  });


});

// tilts routing
var Tilt = require('./../models/Tilt.js');
Tilt = mongoose.model('Tilt');

router.get('/tilts', function(req, res, next) {
  /*
  Tilt.find(function(err, tilts){
    if(err){ return next(err); }

    res.json(tilts);
  });
  */
  var time = req.param('Timepoint');
  var sg = req.param('SG');
  var temp = req.param('Temp');

  var item = {
    Timepoint: time,
    Temp: sg,
    SG: temp
  };
  var tiltItem = new Tilt(item);
  tiltItem.save(function(err, tilt){
    if(err){ return next(err); }

    res.json(tilt);
  });

});

router.post('/tilts', function(req, res, next) {
  var time = req.param('Timepoint');
  var sg = req.param('SG');
  var temp = req.param('Temp');

  var item = {
    Timepoint: time,
    Temp: sg,
    SG: temp
  };


  var tiltItem = new Tilt(item);
  tiltItem.save(function(err, tilt){
    if(err){ return next(err); }

    res.json(tilt);
  });
});

