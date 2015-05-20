'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid']);

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

beerboxApp.controller('MainCtrl', [
	'$scope',
	'malts',
	function($scope, malts){
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
		/* 
    var columnDefs = [
				{displayName: "", field: "",width: 30},
        {displayName: "Name", field: "name", filter: 'set'},
        {displayName: "Type Malt", field: "type"},
        {displayName: "Color (SRM)", field: "srm"},
        {displayName: "Potential SG", field: "pg"},
        {displayName: "Must Mash", field: "mash"}
    ];	

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: malts.malts,
				dontUseScrolls: true,
				enableFilter: true
    };
		*/
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
		
}]);

beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('fermentables', {
				url: '/fermentables',
				templateUrl: '/fermentables.html',
				controller: 'MainCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
					}]
				}
			});
			
		$urlRouterProvider.otherwise('fermentables');
	}
]);
