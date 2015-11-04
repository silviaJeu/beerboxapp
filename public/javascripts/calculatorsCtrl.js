'use strict';


beerboxApp.controller('CalculatorsCtrl', [
	'$scope',
	function($scope) {
		$scope.title = 'Strumenti per il calcolo';
		$scope.og;
		$scope.fg;
		$scope.att;
		$scope.ltPr;
		$scope.co2;
		$scope.temp;
		$scope.currCo2;
		$scope.calculateAlchool = function(og, fg)  {
			var o = parseGravity(og);
			var f = parseGravity(fg);
			return calculateAbv(o, f);
		};

		$scope.calculateAAttenuation = function(og, fg)  {
			var o = parseGravity(og);
			var f = parseGravity(fg);
			$scope.att = calculateAAttenuation(o, f); 
			return $scope.att;
		};
		
		$scope.calculateRAttenuation = function()  {
			return calculateRAttenuation($scope.att);
		};

		$scope.calculateCurrentCo2 = function(temp)  {
			$scope.currCo2 = calculateCurrentCo2(temp); 
			return $scope.currCo2;
		};

		$scope.calculatePriming = function(lt, co2)  {
			var gr = calculatePriming(lt, co2, $scope.currCo2);
			return gr;
		}
		
}]);

beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('calculators', {
				url: '/calculators',
				templateUrl: '/app/views/calculators.html',
				controller: 'CalculatorsCtrl'
			})
	}
]);