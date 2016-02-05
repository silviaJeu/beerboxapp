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
		$scope.lovibond=0;
		$scope.srm=0;
		$scope.ebc=0;
		$scope.plato=0;
		$scope.calcOg=1000;
		
		angular.element(document).ready(function() {
			//platoform
			angular.element("body").on("input", "#strumenti_plato", function(e) {
				var og = calcOgFromPlato($(this).val());
				angular.element("#strumenti_calcOg").val(og);
				console.log(angular.element("#strumenti_calcOg").val());
			});
			
			angular.element("body").on("input", "#strumenti_calcOg", function(e) {
				var plato = calculatePlato($(this).val());
				angular.element("#strumenti_plato").val(plato);
			});
			
			//colourform
			angular.element("body").on("input", "#strumenti_srm", function(e) {
				var ebc = $scope.calulateEbc($(this).val(),0);
				var lov = $scope.calulateLov($(this).val(),0);
				angular.element("#strumenti_ebc").val(ebc);
				angular.element("#strumenti_lov").val(lov);
			});
			angular.element("body").on("input", "#strumenti_ebc", function(e) {
				var srm = $scope.calulateSrm($(this).val(),0);
				var lov = $scope.calulateLov(0,$(this).val());
				angular.element("#strumenti_srm").val(srm);
				angular.element("#strumenti_lov").val(lov);
			});
			
			angular.element("body").on("input", "#strumenti_lov", function(e) {
				var srm = $scope.calulateSrm(0,$(this).val());
				var ebc = $scope.calulateEbc(0,$(this).val());
				angular.element("#strumenti_srm").val(srm);
				angular.element("#strumenti_ebc").val(ebc);
			});
		});
		
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
				var l = ((srm*1) + 0.76) / 1.3546 ;
				return Number(Math.round(l+'e1')+'e-1');
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