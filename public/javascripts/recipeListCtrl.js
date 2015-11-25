'use strict';

beerboxApp.factory('verifyDelete', function($mdDialog) {
	  return function(recipe) {
		var confirm = $mdDialog.confirm()
		// .title('Conferma')
		.content('Sei sicuro di eliminare ' + recipe.name + '?').ariaLabel(
				'Elimina ricetta').ok('Si').cancel('Cancella');
		return $mdDialog.show(confirm);
	}
})

    
beerboxApp.controller('RecipeListCtrl', [ '$scope', 'recipes', '$mdDialog',
		'verifyDelete', function($scope, recipes, $mdDialog, verifyDelete) {
			$scope.recipes = recipes.recipes;
			$scope.user = "Silvia";

			$scope.deleterecipe = function(recipe) {
				verifyDelete(recipe).then(function() {
					recipes.remove(recipe._id);
					var i = $scope.recipes.indexOf(recipe);
					$scope.recipes.splice(i, 1);
				});
			}
			
			$scope.matchStyle = function(query) {
				return function(recipe) { 
					if(query == null)
						return true;
					return formatString(recipe.style.name).match(formatString(query)); 
				}
			};

			$scope.matchType = function(query) {
				return function(recipe) { 
					if(query == null) {
						return true;
					} else {
						return formatString(recipe.type).match(formatString(query)); 
					}
				}
			};
			
			$scope.styleGroup = styleList($scope.recipes);
			$scope.typeGroup = typeList($scope.recipes);
			
		} ]);