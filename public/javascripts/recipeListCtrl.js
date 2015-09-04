'use strict';

beerboxApp.controller('RecipeListCtrl', [
	'$scope',
	'recipes',
	function($scope, recipes){
		$scope.recipes = recipes.recipes;
		$scope.user = "Silvia";
	}
]);