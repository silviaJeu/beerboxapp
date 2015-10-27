'use strict';


beerboxApp.controller('IngredientsCtrl', [
	'$scope','malts','hops','miscs','yeasts','$stateParams','$q',
	function($scope,malts,hops,miscs,yeasts,$stateParams,$q) {
		$scope.title = 'Lista Ingredienti';
		$scope.tempselected = [];
		var m = malts.getAll(),
	    h = hops.getAll(),
	    e = miscs.getAll(),
	    y = yeasts.getAll()

		$q.all([m, h, e, y]).then(function(responses){
			$scope.malts = responses[0].data;
			$scope.hops = responses[1].data;
			$scope.miscs = responses[2].data;
			$scope.yeasts = responses[3].data;
		});		
		
		$scope.srmClass = function(srm) {
			return "srm"+Math.min(Math.round(srm),40);
		}
		
}]);

beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('ingredients', {
				url: '/ingredients',
				templateUrl: '/app/views/ingredients.html',
				controller: 'IngredientsCtrl'
			})
	}
]);