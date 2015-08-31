'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid','angularModalService','xeditable','ui.bootstrap','ngMaterial']);

beerboxApp.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('teal');
		//.accentPalette('orange');
});

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


beerboxApp.controller('RecipeCtrl', [
	'$scope',
	'ModalService',
	function($scope,ModalService){
		$scope.recipeSize = 25;
		$scope.recipeEff = 75;
		$scope.style;
		$scope.type;
		$scope.name;
		$scope.ibu;
		$scope.og;
		$scope.srm;
		$scope.fg;
		$scope.abv;
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
			{id : "1", name : "American Light Lager", og: "1.028 – 1.040", fg: "0.998 – 1.008", ibu : "8 – 12", srm : "2 – 3", abv : "2.8 – 4.2" },
			{id : "1", name : "American Pale Ale", og: "1.045 – 1.060", fg: "1.010 – 1.015", ibu : "30 – 50", srm : "5 – 10", abv : "4.5 – 6.2" },
			{id : "2", name : "American IPA", og: "1.056 – 1.070", fg: "1.008 – 1.014", ibu : "40 – 70", srm : "6 – 14", abv : "5.5 – 7.5" },
			{id : "3", name : "German Pils", og: "1.044 – 1.050", fg: "1.008 – 1.013", ibu : "22 – 40", srm : "2 – 5", abv : "4.4 – 5.2" },
			{id : "4", name : "English Porter", og: "1.040 – 1.052", fg: "1.008 – 1.014", ibu : "18 – 35", srm : "20 – 30", abv : "4.0 – 5.4" },
			{id : "5", name : "Irish Stout", og: "1.036 – 1.044", fg: "1.007 – 1.011", ibu : "25 – 45", srm : "25 – 40", abv : "4.0 – 4.5" }
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
		
		$scope.checkDisabled = function() {
			console.log($scope.style+"-"+$scope.type+"-"+$scope.name)
			var r = true;
			if($scope.style != undefined && $scope.type != undefined && $scope.name != undefined)
				r = false;
			return r;
		}	
		
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
        })			
				var pg = total * ($scope.recipeEff / 100);
				var og = pg/ltToGal($scope.recipeSize);
				$scope.og = Math.round(og) + 1000;
				return $scope.og;
		}
				
		$scope.showtotalOg = function()	{
			$scope.totalOg();
			return $scope.og.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		
		
		$scope.ogpercent = function()	{
			return Math.min(($scope.og - 1000) * 0.85,100);
		}
		
		$scope.rangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("–");
				rangeL = Math.min((a[0] - 1000) * 0.85,100);
			}
			return rangeL;
		}

		$scope.rangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("–");
				var l = (a[0] - 1000) * 0.85;
				var r = (a[1] - 1000) * 0.85;
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
		
		$scope.totalIbu = function() {
        var totalIbu = 0;
        angular.forEach($scope.hopsList, function(item) {
						if(item.step != "Whirlpool" && item.step != "Dry Hop" && item.minutes > 0) {
							var min = item.minutes;
							if(item.step == "First Wort" || item.step == "Mash") min = 20;
							var u = getUtil(min);
							totalIbu += calculateIbu(item.quantity,item.alfa,item.formatType,$scope.recipeSize,u);
						}
        })
				var ibu = Number(Math.round(totalIbu+'e2')+'e-2');
				$scope.ibu = ibu;
        return ibu;
    };		
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
		
		$scope.totalSrm = function() {
				var s = calculateSrm($scope.fermentablesList, $scope.recipeSize); 
				$scope.srm = Number(Math.round(s+'e2')+'e-2');
				return $scope.srm;
    };		
		
		$scope.srmPercent = function()	{
			return Math.min(($scope.srm) * 2,50);
		}
		
		$scope.srmRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.srm.split("–");
				rangeL = Math.min(a[0] * 2,50);
			}
			return rangeL;
		}
		
		$scope.srmRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.srm.split("–");
				var l = a[0] * 2;
				var r = a[1] * 2;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		$scope.totalAbv = function() {
			$scope.abv = calculateAbv($scope.og, $scope.fg);
			return $scope.abv;
		}
		
		$scope.abvPercent = function()	{
			return Math.min(($scope.abv) * 6.6,50);
		}		
		
		$scope.abvRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.abv.split("–");
				rangeL = Math.min(a[0] * 6.6,50);
			}
			return rangeL;
		}
		
		$scope.abvRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.abv.split("–");
				var l = a[0] * 6.6;
				var r = a[1] * 6.6;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		$scope.estFg = function() {
			var fg = 1000;
			if($scope.yeastsList.length > 0) 
				fg = calculateFg($scope.totalOg(), $scope.yeastsList);
			$scope.fg = fg;
			return fg;
		}
		
		$scope.showEstFg = function() {
			$scope.estFg();
			return $scope.fg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		
		$scope.fgPercent = function()	{
			return Math.min(($scope.fg - 1000) * 0.8,100);
		}
		
		$scope.fgRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.fg.replace(/\./g,"").split("–");
				rangeL = Math.min((a[0] - 1000) * 0.8,100);
			}
			return rangeL;
		}

		$scope.fgRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.fg.replace(/\./g,"").split("–");
				var l = (a[0] - 1000) * 0.8;
				var r = (a[1] - 1000) * 0.8;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		$scope.totalYeast = function() {
        var totalYeast = 0;
        angular.forEach($scope.yeastsList, function(item) {
            totalYeast += item.weight;
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
				if(type.indexOf("hop") == 0) {
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
			if(item.minutes != 0 && item.quantity != 0 && item.alfa != 0 && $scope.recipeSize != 0 && item.step != "Whirlpool" && item.step != "Dry Hop") {
				var min = item.minutes;
				if(item.step == "First Wort" || item.step == "Mash") min = 20;
				var u = getUtil(min);
				ibu = calculateIbu(item.quantity,item.alfa,item.formatType,$scope.recipeSize,u);
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
						if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
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
