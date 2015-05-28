var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose');
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

router.delete('/malts', function(req, res, next) {
	var malt = new Malt(req.body);
	
  malt.remove(function(err, malt){
    if(err){ return next(err); }

    res.json(malt);
  });
});

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