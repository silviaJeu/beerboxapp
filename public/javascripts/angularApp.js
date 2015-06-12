'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid','angularModalService','xeditable']);

beerboxApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

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
	
	return o;	
}]);
beerboxApp.controller('MaltCtrl', [
	'$scope',
	'malts',
	'$element',
	'close',
	function($scope, malts, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
	  $scope.malts = malts.malts;
		$scope.optionsType = [
		  "Base Malt",
      "Special Malt",
      "Sugar",
      "Dry Extract",
			"Liquid Extract",
			"Other Adjunct" 
		];
		$scope.mashType = [
			{id : "true", name : "True"},
			{id : "false", name : "False"}
		];

		$scope.addMalt = function(){
			if(!$scope.name || $scope.name === '') { return; }
			malts.create({
				name: $scope.name,
				type: $scope.type,
				srm: $scope.srm,
				pg: $scope.pg,
				mash: $scope.mash				
			}).then(function(){
				$scope.gridOptions.api.onNewRows();
			});
			$scope.name = '',
			$scope.type = '',
			$scope.srm = '',
			$scope.pg = '',
			$scope.mash	= ''			
		};
				
		$scope.add = function(item) {
			$scope.inserted = {
				id: $scope.itemselected.length+1,
				name: item.name,
				quantity: 0.500,
				percent: null 
			};
			//$scope.itemselected.push($scope.inserted);
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0){
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);	
			}	
		};	
		
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function(result) {
 	  close({
      name: $scope.name,
      age: $scope.age,
			itemselected: $scope.itemselected
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };		
		
}]);

beerboxApp.controller('HopCtrl', [
	'$scope',
	'hops',
	'$element',
	'close',
	function($scope, hops, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
	  $scope.hops = hops.hops;
		$scope.optionsType = [
		  "Amaro",
      "Aroma",
      "Entrambi"
		];

		$scope.addHop = function(){
			if(!$scope.name || $scope.name === '') { return; }
			hops.create({
				name: $scope.name,
				type: $scope.type,
				alfa: $scope.alfa,
				origin: $scope.origin
			}).then(function(){
				$scope.gridOptions.api.onNewRows();
			});
			$scope.name = '',
			$scope.type = '',
			$scope.alfa = '',
			$scope.origin = ''
		};
		
		
		$scope.add = function(item) {
			$scope.inserted = {
				id: $scope.itemselected.length+1,
				name: item.name,
				quantity: 100,
				alfa: item.alfa,
				ibu: null,
				minutes: 60				
			};
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0) {
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);
			}
		};	
		
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function(result) {
 	  close({
      name: $scope.name,
      age: $scope.age,
			itemselected: $scope.itemselected
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };		
		
}]);

beerboxApp.controller('YeastCtrl', [
	'$scope',
	'yeasts',
	'$element',
	'close',
	function($scope, yeasts, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
	  $scope.yeasts = yeasts.yeasts;
		$scope.optionsType = [
		  "Ale",
      "Lager"
		];
		$scope.formatType = [
		  "Liquido",
      "Secco"
		];
		

		$scope.addYeast = function(){
			if(!$scope.name || $scope.name === '') { return; }
			yeasts.create({
				name: $scope.name,
				type: $scope.type,
				lab: $scope.lab,
				prodId: $scope.prodId,
				form: $scope.form,
				tempRange: $scope.tempRange,
				attenuation: $scope.attenuation
			}).then(function(){
				$scope.gridOptions.api.onNewRows();
			});
			$scope.name = '',
			$scope.type = '',
			$scope.lab = '',
			$scope.prodId = '',
			$scope.form = '',
			$scope.tempRange = '',
			$scope.attenuation = ''
		};	
		
		$scope.add = function(item) {
			$scope.inserted = {
				id: $scope.itemselected.length+1,
				name: item.name,
				prodId: item.prodId,
				form: item.form,
				type: item.type,
				lab: item.lab,	
				tempRange: item.tempRange, 
				attenuation: item.attenuation 
			};
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0) {
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);		
			}
		};	
		
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function(result) {
 	  close({
      name: $scope.name,
      age: $scope.age,
			itemselected: $scope.itemselected
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };		
		
}]);

beerboxApp.controller('RecipeCtrl', [
	'$scope',
	'ModalService',
	function($scope,ModalService){
		$scope.Math = window.Math;
		$scope.Number = window.Number;
		$scope.recipeType = [
			"All grain",
			"Estratto +  grani",
			"Partial Mash"
		];
		$scope.recipeStyle = [
			"American Pale Ale",
			"American IPA",
			"German Pils",
			"Robust Porter",
			"Dry Stout"
		];		
		$scope.fermentablesList = [];
		$scope.hopsList = [];	
		$scope.yeastsList = [];			
		$scope.hopFormatType = [
		  "Pellet",
      "Plug",
      "Coni"
		];		
		$scope.hopStepType = [
		  "Boil",
      "Dry Hop",
      "Mash",
			"First Wort",
			"Whirlpool"
		];		
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.fermentablesList, function(item) {
            total += item.quantity;
        })
        return total;
    };
		
		$scope.totalHop = function() {
        var totalHop = 0;
        angular.forEach($scope.hopsList, function(item) {
            totalHop += item.quantity;
        })
        return totalHop;
    };
		
		$scope.totalYeast = function() {
        var totalYeast = 0;
        angular.forEach($scope.yeastsList, function(item) {
            totalYeast += item.quantity;
        })
        return totalYeast;
    };
    
		$scope.percent = function(qt) {
        var total = $scope.total();
				var val = (100 * qt) / total;
				var percent = Number(Math.round(val+'e2')+'e-2');
        return percent;
    };

    $scope.removeMalt = function(index) {
        $scope.fermentablesList.splice(index, 1);
    };	
		
    $scope.removeHop = function(index) {
        $scope.hopsList.splice(index, 1);
    };
		
		$scope.copy = function(index,type) {
				console.log(index+" : "+type.indexOf("hop"));
				if(type.indexOf("hop") == 0) {
					console.log("index: "+$scope.hopsList[index]);
					var item = $scope.hopsList[index];
					var copy = {
						id: $scope.hopsList.length+1,
						name: item.name,
						formatType: item.formatType,
						step: item.step,
						quantity: item.quantity,
						alfa: item.alfa,
						ibu: item.ibu,
						minutes: item.minutes				
					};					
					$scope.hopsList.push(copy);
				}
					
    };
		
    $scope.removeYeast = function(index) {
        $scope.yeastsList.splice(index, 1);
    };			
		
		$scope.extendDeep = function extendDeep(dst) {
			var l = dst.length;
			angular.forEach(arguments, function(obj) {
				if (obj !== dst) {
					angular.forEach(obj, function(value, key) {
						//console.log("value: "+value.name);
						//console.log("key: "+key);
						if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
							//extendDeep(dst[key], value);
							dst[key+l] = value
						} else {
							dst[key+l] = value;
						}     
					});   
				}
			});
			//$scope.$apply();
			return dst;
		};
		
		$scope.showComplex = function() {
			ModalService.showModal({
				templateUrl: "/app/views/fermentables.html",
				controller: "MaltCtrl",
				inputs: {
					title: "Fermentabili"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.fermentablesList = $scope.extendDeep($scope.fermentablesList, result.itemselected);
				});			
			});
		};	
		
		$scope.showHopModal = function() {
			ModalService.showModal({
				templateUrl: "/app/views/hops.html",
				controller: "HopCtrl",
				inputs: {
					title: "Luppoli"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.hopsList = $scope.extendDeep($scope.hopsList, result.itemselected);
				});			
			});
		};			

		$scope.showYeastModal = function() {
			ModalService.showModal({
				templateUrl: "/app/views/yeast.html",
				controller: "YeastCtrl",
				inputs: {
					title: "Lievito"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.yeastsList = $scope.extendDeep($scope.yeastsList, result.itemselected);
				});			
			});
		};			
	
	}		
]);

beerboxApp.controller('ModalController', [
  '$scope', '$element', 'title', 'close',
  function($scope, $element, title, close) {

  $scope.name = null;
  $scope.age = null;
  $scope.title = title;
  //$scope.maltlist = Ingredient.query({ingrId: 'fermentables'});
	$scope.itemselected = [];
	$scope.activeValue = null;
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function(result) {
 	  close({
      name: $scope.name,
      age: $scope.age,
			itemselected: $scope.itemselected
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);


beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('fermentables', {
				url: '/fermentables',
				templateUrl: '/app/views/fermentables.html',
				controller: 'MaltCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
					}]
				}
			});
		$stateProvider
			.state('hops', {
				url: '/hops',
				templateUrl: '/app/views/hops.html',
				controller: 'HopCtrl'
				,
				resolve: {
					postPromise: ['hops', function(hops){
					return hops.getAll();
					}]
				}
			});			
		$stateProvider
			.state('yeast', {
				url: '/yeast',
				templateUrl: '/app/views/yeast.html',
				controller: 'YeastCtrl'
				,
				resolve: {
					postPromise: ['yeasts', function(yeasts){
					return yeasts.getAll();
					}]
				}
			});				
		
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MaltCtrl'
			});
		$stateProvider
			.state('recipe', {
				url: '/recipe',
				templateUrl: '/app/views/recipe.html',
				controller: 'RecipeCtrl',
				resolve: {
					postPromise: ['malts','hops', 'yeasts',function(malts, hops, yeasts){
						malts = malts.getAll();
						hops = hops.getAll();
						yeasts = yeasts.getAll();
					}]
				}				
			});		
			
		$urlRouterProvider.otherwise('home');
	}
]);
