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
		$scope.lovibond;
		$scope.srm;
		$scope.ebc;
//		$scope.plato;
//		$scope.calcOg=0;
//	    $scope.$watch('calcOg', function (newValue, oldValue) {
//	        console.log('oldValue=' + oldValue);
//	        console.log('newValue=' + newValue);
//	        //do something
//	    });		
	    $scope.$watch('one * two', function (value) {
	        $scope.total = value;
	    });		
		$scope.convertOgPlato = function(plato,og) {
			if(og > 0) {
				var p = calculatePlato(og);
				$scope.plato = p;
				console.log(p);
			} else if(plato > 0) {
				var o = calculateOg(plato);
				$scope.calcOg = o;
				console.log(o);
			}
		}
		
        $scope.calulateColor = function(lov,ebc,srm){
			if(lov != 0) {
				var s = (1.3546 * lov) - 0.76;
				var e = s * 1.97;
				return $scope.srm;
			} else if(ebc != 0) {
				var s = ebc * 0.508;
				$scope.srm = Number(Math.round(s+'e1')+'e-1');
				var l = (srm + 0.76) / 1.3546;
				$scope.lovibond = Number(Math.round(l+'e1')+'e-1');
				return;
			} else if(srm != 0) {
				var e = srm * 1.97;
				$scope.ebc = Number(Math.round(e+'e1')+'e-1');
				var l = (srm + 0.76) / 1.3546;
				$scope.lovibond = Number(Math.round(l+'e1')+'e-1');
				return;
			}
		}
		
		$scope.calulateEbc = function(srm,lov){
			if(srm != 0 && srm != undefined) {
				var e = srm * 1.97;
				return Number(Math.round(e+'e1')+'e-1');
			} else if(lov != 0 && lov != undefined) {
				var s = (1.3546 * lov) - 0.76;
				var e = s * 1.97;
				return Number(Math.round(e+'e1')+'e-1');
			}
			return 0;
		}

		$scope.calulateSrm = function(ebc,lov){
			if(ebc != 0 && ebc != undefined) {
				var s = ebc * 0.508;
				return Number(Math.round(s+'e1')+'e-1');
			}
			else if(lov != 0 && lov != undefined){
				var s = (1.3546 * lov) - 0.76;
				return Number(Math.round(s+'e1')+'e-1');
			}
			return 0;
		}

		$scope.calulateLov = function(srm,ebc){
			if(srm != 0 && srm != undefined) {
				var l = Number(srm + 0.76);
				return l;
			} else if(ebc != 0 && ebc != undefined){
				var s = ebc * 0.508;
				var l = (s + 0.76) / 1.3546;
				return Number(Math.round(l+'e1')+'e-1');
			}
			return 0;
		}
		
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