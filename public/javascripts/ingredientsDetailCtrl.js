'use strict';


beerboxApp.controller('IngredientsCtrl', [
	'$scope', 'malts', '$stateParams',
	function($scope, malts, $stateParams) {
		$scope.title = 'Lista Ingredienti';
		$scope.tempselected = [];
		$scope.malts = malts.malts;
}]);

beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('ingredients', {
				url: '/ingredients',
				templateUrl: '/app/views/ingredients.html',
				controller: 'IngredientsCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
					}]
			}
			})
}]);