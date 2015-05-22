'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid','angularModalService']);

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

beerboxApp.controller('MaltCtrl', [
	'$scope',
	'malts',
	'$element',
	'close',
	function($scope, malts, $element, close){
		$scope.itemselected = [];
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
			var i = $scope.itemselected.indexOf(item.name);
			if(i < 0)
				$scope.itemselected.push(item.name);		
			else
				$scope.itemselected.splice(i,item.name.length);		
		}	
		
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
		$scope.fermentablesList = [];		
		//a solution that handels multiple objects merge
		
		$scope.extendDeep = function extendDeep(dst) {
			var l = dst.length;
			angular.forEach(arguments, function(obj) {
				if (obj !== dst) {
					angular.forEach(obj, function(value, key) {
						if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
							extendDeep(dst[key], value);
						} else {
							dst[key+l] = value;
						}     
					});   
				}
			});
			return dst;
		};
		
		$scope.showComplex = function() {
			ModalService.showModal({
				templateUrl: "/fermentables.html",
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
				templateUrl: '/fermentables.html',
				controller: 'MaltCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
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
				templateUrl: '/recipe.html',
				controller: 'RecipeCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
					}]
				}				
			});					
		$urlRouterProvider.otherwise('home');
	}
]);
