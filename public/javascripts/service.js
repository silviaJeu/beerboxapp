// service
beerboxApp.factory('malts', ['$http', function($http){
  var o = {
		malts: []
	};
	o.getAll = function() {
		return $http.get('/malts').success(function(data){
			angular.copy(data, o.malts);
		});
	};
	o.create = function(post) {
		return $http.post('/malts', post).success(function(data){
			o.malts.push(data);
		});
	};	
	o.get = function(id) {
		return	$http.get('/malts/' + id).then(function(res){
			return res;
		});
	};	
	return o;	
}]);

beerboxApp.factory('hops', ['$http', function($http){
  var o = {
		hops: []
	};
	o.getAll = function() {
		return $http.get('/hops').success(function(data){
			angular.copy(data, o.hops);
		});
	};
	o.create = function(post) {
		return $http.post('/hops', post).success(function(data){
			o.hops.push(data);
		});
	};
	o.get = function(id) {
		return	$http.get('/hops/' + id).then(function(res){
			return res;
		});
	};	
	return o;	
}]);

beerboxApp.factory('yeasts', ['$http', function($http){
  var o = {
		yeasts: []
	};
	o.getAll = function() {
		return $http.get('/yeasts').success(function(data){
			angular.copy(data, o.yeasts);
		});
	};
	o.create = function(post) {
		return $http.post('/yeasts', post).success(function(data){
			o.yeasts.push(data);
		});
	};	
	o.get = function(id) {
		return	$http.get('/yeasts/' + id).then(function(res){
			return res;
		});
	};		
	return o;	
}]);

beerboxApp.factory('recipes', ['$http','malts','hops','yeasts', function($http,malts,hops,yeasts){
  var o = {
		  recipes: []
	};
	
  o.getAll = function() {
		return $http.get('/recipes').success(function(data){
      angular.copy(data, o.recipes);
    });
  };
  
  o.get = function(id) {
	return	$http.get('/recipes/' + id).then(function(res){
		var maltList = malts.malts;
		var fermentablesList = [];
		var hopsList = [];
		var yeastsList = [];
		
		angular.forEach(res.data.malts, function(item) {
			malts.get(item.id).then(function(m) {
				var mdata = m.data;
				var malt = {
						id: mdata._id,
						name: mdata.name,
						quantity: item.qty,
						percent: null,
						pg: mdata.pg,
						og: null,
						srm: mdata.srm
					};
				fermentablesList.push(malt);
			});
		});

		angular.forEach(res.data.hops, function(item) {
			hops.get(item.id).then(function(h) {
				var hdata = h.data;
				var hop = {
						id: hdata._id,
						name: item.name,
						quantity: item.qty,
						formatType: item.formatType,
						minutes: item.minutes,
						step: item.step,
						//change to item.alfa
						alfa: item.alfa
				};
				hopsList.push(hop);
			});
		});

		angular.forEach(res.data.yeasts, function(item) {
			yeasts.get(item.id).then(function(y) {
				var ydata = y.data;
				var yeast = {
						id: ydata._id,
						name: item.name,
						weight: item.qty,
						attenuation: ydata.attenuation 
				};
				yeastsList.push(yeast);
			});
		});
		var result = {
						recipeInfo : res.data,
						fermentablesList : fermentablesList,
						hopsList : hopsList,
						yeastsList : yeastsList
					}
		return result;
	});
  }
  
  o.create = function(post) {
	  return $http.post('/recipes', post).success(function(data){
				o.recipes.push(data);
			});
	};	
		
  return o;	
}]);

beerboxApp.factory('style', ['$http', function($http){
	  var s = {
			styles: []
		};
		s.getAll = function() {
			return $http.get('/style').success(function(data){
				angular.copy(data, s.style);
			});
		};
		s.create = function(post) {
			return $http.post('/style', post).success(function(data){
				s.style.push(data);
			});
		};
		s.get = function(id) {
			return	$http.get('/style/' + id).then(function(res){
				return res;
			});
		};	
		return s;	
}]);