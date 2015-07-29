'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid','angularModalService','xeditable','ui.bootstrap']);

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
				percent: null,
				pg: item.pg,
				og: null,
				srm: item.srm
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
				quantity: 10,
				alfa: item.alfa,
				ibu: 0,
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
		$scope.recipeSize = 25;
		$scope.recipeEff = 75;
		$scope.style;
		$scope.ibu;
		$scope.og;
		$scope.srm;
		$scope.Math = window.Math;
		$scope.Number = window.Number;
		$scope.recipeType = [
			"All grain",
			"Estratto +  grani",
			"Partial Mash"
		];
		$scope.mashType = [
			{id : "true", name : "True"},
			{id : "false", name : "False"}
		];
		
		$scope.recipeStyle = [
			{id : "1", name : "American Pale Ale", og: "1.045 – 1.060", fg: "1.010 – 1.015", ibu : "30 – 50", srm : "5 – 10", abv : "4.5 – 6.2" },
			{id : "2", name : "American IPA", og: "1.056 – 1.070", fg: "1.008 – 1.014", ibu : "40 – 70", srm : "6 – 14", abv : "5.5 – 7.5" },
			{id : "3", name : "German Pils", og: "1.044 – 1.050", fg: "1.008 – 1.013", ibu : "22 – 40", srm : "2 – 5", abv : "4.4 – 5.2" },
			{id : "4", name : "Robust Porter", og: "1.044 – 1.050", fg: "1.008 – 1.013", ibu : "22 – 40", srm : "2 – 5", abv : "4.4 – 5.2" },
			{id : "5", name : "Dry Stout", og: "1.044 – 1.050", fg: "1.008 – 1.013", ibu : "22 – 40", srm : "2 – 5", abv : "4.4 – 5.2" }
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
		$scope.totalOg = function() {
				var total = 0;
				var tsrm = 0;
        angular.forEach($scope.fermentablesList, function(item) {
            total += item.og;
						tsrm += item.srm;
						console.log("item.srm: "+item.srm);
        })			
				var pg = total * ($scope.recipeEff / 100);
				var og = pg/ltToGal($scope.recipeSize);
				$scope.og = Math.round(og) + 1000;
				$scope.srm = tsrm;
				console.log("srm: "+tsrm);
				//console.log("og: "+og+"-"+Number(Math.round(og+'e2')+'e-2')+"-"+Math.round(og+'e2')+"-"+Math.round(og));
				return $scope.og;
		}
				
		$scope.showtotalOg = function()	{
			$scope.totalOg();
			return $scope.og.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		
		$scope.ogpercent = function()	{
			return Math.min(($scope.og - 1000) * 0.77,100);
		}
		
		$scope.rangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("–");
				rangeL = Math.min((a[0] - 1000) * 0.77,100);
			}
			return rangeL;
		}

		$scope.rangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("–");
				var l = (a[0] - 1000) * 0.77;
				var r = (a[1] - 1000) * 0.77;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		$scope.ibupercent = function()	{
			return Math.min(($scope.ibu) * 0.83,120);
		}
		
		$scope.ibuRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.ibu.split("–");
				rangeL = Math.min(a[0] * 0.83,120);
			}
			return rangeL;
		}
		
		$scope.ibuRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.ibu.split("–");
				var l = a[0] * 0.83;
				var r = a[1] * 0.83;
				rangeW = r -l; 
			}
			return rangeW;
		}		

		
		$scope.totalHop = function() {
        var totalHop = 0;
        angular.forEach($scope.hopsList, function(item) {
            totalHop += item.quantity;
        })
        return totalHop;
    };
		$scope.totalSrm = function() {
        return $scope.srm;
    };		
		
		$scope.totalIbu = function() {
        var totalIbu = 0;
        angular.forEach($scope.hopsList, function(item) {
						var u = getUtil(item.minutes);
            totalIbu += calculateIbu(item.quantity,item.alfa,$scope.recipeSize,u);
        })
				var ibu = Number(Math.round(totalIbu+'e2')+'e-2');
				$scope.ibu = ibu;
        return ibu;
    };		
		
		$scope.srmPercent = function()	{
			return Math.min(($scope.srm) * 2,120);
		}
		
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
		
		$scope.calculateIbu = function(item) {
			var ibu = 0;
			if(item.minutes != 0 && item.quantity != 0 && item.alfa != 0 && $scope.recipeSize != 0) {
				var u = getUtil(item.minutes);
				ibu = calculateIbu(item.quantity,item.alfa,$scope.recipeSize,u);
			}
			return Number(Math.round(ibu+'e2')+'e-2');
		}
		
		$scope.calculateOg = function(item) {
			var og = 0;
			var pg = item.pg.substring(item.pg.length-2);
			og = calculateOg($scope.recipeEff, item.quantity, pg);
			item.og = og;
			return Number(Math.round(og+'e2')+'e-2');
		}
		
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
