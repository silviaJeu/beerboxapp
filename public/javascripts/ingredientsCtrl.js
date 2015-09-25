'use strict';

beerboxApp.controller('MaltCtrl', [
	'$scope',
	'malts',
	'$element',
	'close',
	function($scope, malts, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
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
			$scope.inserted = {
//				id: $scope.itemselected.length+1,
				id: item._id,
				name: item.name,
				quantity: 0.500,
				percent: null,
				pg: item.pg,
				og: null,
				srm: item.srm
			};
			//$scope.itemselected.push($scope.inserted);
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0){
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);	
			}	
		};	
		
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

beerboxApp.controller('HopCtrl', [
	'$scope',
	'hops',
	'$element',
	'close',
	function($scope, hops, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
		$scope.hops = hops.hops;
		$scope.optionsType = [
		                      "Amaro",
		                      "Aroma",
		                      "Entrambi"
		                     ];

		$scope.addHop = function(){
			if(!$scope.name || $scope.name === '') { return; }
			hops.create({
				name: $scope.name,
				type: $scope.type,
				alfa: $scope.alfa,
				origin: $scope.origin
			}).then(function(){
				$scope.gridOptions.api.onNewRows();
			});
			$scope.name = '',
			$scope.type = '',
			$scope.alfa = '',
			$scope.origin = ''
		};
		
		
		$scope.add = function(item) {
			$scope.inserted = {
//				id: $scope.itemselected.length+1,
				id: item._id,
				name: item.name,
				quantity: 10,
				alfa: item.alfa,
				ibu: 0,
				minutes: 60				
			};
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0) {
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);
			}
		};	
		
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

beerboxApp.controller('YeastCtrl', [
	'$scope',
	'yeasts',
	'$element',
	'close',
	function($scope, yeasts, $element, close){
		$scope.itemselected = [];
		$scope.tempselected = [];
		$scope.yeasts = yeasts.yeasts;
		$scope.optionsType = [
		                      "Ale",
		                      "Lager"
		                     ];
		$scope.formatType = [
		                     "Liquido",
		                     "Secco"
		                    ];
		
		$scope.addYeast = function(){
			if(!$scope.name || $scope.name === '') { return; }
			yeasts.create({
				name: $scope.name,
				type: $scope.type,
				lab: $scope.lab,
				prodId: $scope.prodId,
				form: $scope.form,
				rangeT: $scope.rangeT,
				attenuation: $scope.attenuation,
				weight: $scope.weight
			}).then(function(){
				//$scope.gridOptions.api.onNewRows();
			});
			$scope.name = '',
			$scope.type = '',
			$scope.lab = '',
			$scope.prodId = '',
			$scope.form = '',
			$scope.rangeT = '',
			$scope.attenuation = '',
			$scope.weight = ''
		};	
		
		$scope.add = function(item) {
			$scope.inserted = {
//				id: $scope.itemselected.length+1,
				id: item._id,
				name: item.name,
				prodId: item.prodId,
				form: item.form,
				type: item.type,
				lab: item.lab,	
				rangeT: item.rangeT, 
				attenuation: item.attenuation,
				weight: item.weight
			};
			var i = $scope.tempselected.indexOf(item.name);
			if(i < 0) {
				$scope.tempselected.push(item.name);		
				$scope.itemselected.push($scope.inserted);
			}
			else {
				$scope.tempselected.splice(i,item.name.length);		
				$scope.itemselected.splice(i,item.name.length);		
			}
		};	
		
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

beerboxApp.controller('MiscCtrl', [
'$scope',
'miscs',
'$element',
'close',
function($scope, miscs, $element, close){
	$scope.itemselected = [];
	$scope.tempselected = [];
	$scope.miscs = miscs.miscs;
	$scope.optionsType = [
	                      "Agente per acqua",
	                      "Sapore",
	                      "Spezia",
	                      "Fining",
	                      "Altro"
	                      ];
	
	$scope.addMisc = function(){
		if(!$scope.name || $scope.name === '') { return; }
		miscs.create({
			name: $scope.name,
			type: $scope.type,
			use: $scope.use
		}).then(function(){
			//$scope.gridOptions.api.onNewRows();
		});
		$scope.name = '',
		$scope.type = '',
		$scope.use = ''
	};	
	
	$scope.add = function(item) {
		$scope.inserted = {
				id: item._id,
				name: item.name,
				type: item.type,
				use: item.use
		};
		var i = $scope.tempselected.indexOf(item.name);
		if(i < 0) {
			$scope.tempselected.push(item.name);		
			$scope.itemselected.push($scope.inserted);
		}
		else {
			$scope.tempselected.splice(i,item.name.length);		
			$scope.itemselected.splice(i,item.name.length);		
		}
	};	
	
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



beerboxApp.controller('ModalController', [
'$scope', '$element', 'title', 'close',
	function($scope, $element, title, close) {
	  
	$scope.name = null;
	$scope.age = null;
	$scope.title = title;
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
