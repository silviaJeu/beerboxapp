'use strict';

// Declare app level module which depends on views, and components
var beerboxApp = angular.module('beerboxApp', ['ui.router','beerboxFilters','angularGrid','angularModalService','xeditable','ui.bootstrap','ngMaterial','vAccordion']);

beerboxApp.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('orange');
});

beerboxApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

beerboxApp.controller('RecipeCtrl', [
	'$scope',
	'ModalService',
	'recipes',
	'styles',
	'result',
	'$stateParams',
	function($scope,ModalService,recipes,styles,result,$stateParams){
        /*
		$scope.mashStepChart = {
        	    "chart": {
        	        "caption": "Mash Profile Chart",
        	        "subcaption": "Tot. 96 Minuti",
        	        "xaxisname": "Minuti",
        	        "yaxisname": "Gradi",
        	        "theme": "fint",
        	        "bgColor": "#DDDDDD",
        	        "bgAlpha": "50",
        	        "placevaluesInside": "1",
        	        "valueFontColor": "#ffffff",
        	        "bgColor": "#eeeeee,#cccccc",
        	        "canvasbgColor": "#eeeeee,#b3b3b3",
        	        "canvasbgAlpha": "100",
        	        "canvasBgRatio": "40,60",
        	        "canvasBgAngle": "0"
         	        
        	    },
        	    "categories": [
        	        {
        	            "category": [
        	                {
        	                    "label": "0 Min"
        	                },
        	                {
        	                    "label": "16 Min"
        	                },
        	                {
        	                    "label": "76 Min"
        	                },
        	                {
        	                    "label": "86 Min"
        	                },
        	                {
        	                    "label": "96 Min"
        	                }
        	            ]
        	        }
        	    ],
        	    "dataset": [
        	        {
        	            "seriesname": "Mash Profile",
        	            "renderas": "area",
        	            "showvalues": "0",
        	            "data": [
        	                {
        	                    "value": "52"
        	                },
        	                {
        	                    "value": "68"
        	                },
        	                {
        	                    "value": "68"
        	                },
        	                {
        	                    "value": "78"
        	                },
        	                {
        	                    "value": "78"
        	                }           
        	             ]
        	        }
        	    ]
        	}
        	*/
		$scope.recipeId = $stateParams.id;
		$scope.recipe = result.recipeInfo;
		$scope.fermentablesList = result.fermentablesList;
		$scope.hopsList = result.hopsList;	
		$scope.yeastsList = result.yeastsList;
		$scope.miscsList = result.miscsList;
		$scope.style = result.recipeInfo.style;
		$scope.recipeStyle = styles.data;
		$scope.stepList = result.recipeInfo.steps;
		$scope.user = "Silvia Jeu";
		$scope.type;
		$scope.name;
		$scope.ibu;
		$scope.og;
		$scope.srm;
		$scope.fg;
		$scope.abv;
		$scope.Math = window.Math;
		$scope.Number = window.Number;
		$scope.status = true;
		$scope.recipeType = [
			"All grain",
			"Estratto +  grani",
			"Partial Mash"
		];
		$scope.mashType = [
			{id : "true", name : "True"},
			{id : "false", name : "False"}
		];
		
		$scope.hopFormatType = [
		  "Pellet",
		  "Plug",
		  "Coni"
		];		

		$scope.hopStepType = [
			"Boil",
			"Dry Hop",
			"Mash",
			"First Wort",
			"Whirlpool"
		];		

		$scope.stepType = [
		    "Mash-in",               	
			"Acid Rest",
			"Beta-Glucanase Rest",
			"Protein Rest",
			"Saccarification Rest",
			"B-amilasi Rest",
			"A-amilasi Rest",
			"Mash-out"
		];		

		$scope.mashType = [
			"Decozione",
			"Infusione",
			"Infusione Inglese",
		];		

		$scope.saveRecipe = function () {
			var maltList = [];
			var hopList = [];
			var yeastList = [];
			var miscList = [];
			angular.forEach($scope.fermentablesList, function(item) {
				var m = {
							id: item.id,
							name: item.name,
							qty: item.quantity
						};					
				maltList.push(m);
			})
			
			angular.forEach($scope.hopsList, function(item) {
				var h = {
						id: item.id,
							name: item.name,
							qty: item.quantity,
							formatType: item.formatType,
							minutes: item.minutes,
							step: item.step,	
							alfa: item.alfa
				};					
				hopList.push(h);
			})

			angular.forEach($scope.yeastsList, function(item) {
				var y = {
							id: item.id,
							name: item.name+" "+item.prodId,
							qty: item.weight
						};					
				yeastList.push(y);
			})

			angular.forEach($scope.miscsList, function(item) {
				var m = {
						id: item.id,
						name: item.name,
						qty: item.quantity
				};					
				miscList.push(m);
			})
			
			if($scope.recipeId == undefined) {
				//TODO MODIFICARE NOME CAMPI SCOPE	
				recipes.create({
					user: $scope.user,
					name: $scope.recipe.name,
					type: $scope.recipe.type,
					style: $scope.style,
					og: $scope.og,
					fg: $scope.fg,
					ibu: $scope.ibu,
					srm: $scope.srm,
					abv: $scope.abv,
					efficiency: $scope.recipe.efficiency,
					size: $scope.recipe.size,
					sizePb: $scope.recipe.sizePb,
					malts: maltList,
					hops: hopList,
					yeasts: yeastList,
					miscs: miscList,
					steps: $scope.stepList
				}).then(function(){
					//$mdToast.show($mdToast.simple().content('La ricetta è stata salvata!'));
					alert("La ricetta è stata salvata!");
				});

			} else {
				recipes.update({
					_id: $scope.recipeId,
					user: $scope.user,
					name: $scope.recipe.name,
					type: $scope.recipe.type,
					style: $scope.style,
					og: $scope.og,
					fg: $scope.fg,
					ibu: $scope.ibu,
					srm: $scope.srm,
					abv: $scope.abv,
					efficiency: $scope.recipe.efficiency,
					size: $scope.recipe.size,
					sizePb: $scope.recipe.sizePb,
					malts: maltList,
					hops: hopList,
					yeasts: yeastList,
					miscs: miscList,
					steps: $scope.stepList
				}).then(function(){
					//$mdToast.show($mdToast.simple().content('La ricetta è stata salvata!'));
					alert("La ricetta è stata modificata!");
				});
			}
			
		}
		
	    $scope.total = function() {
	        var total = 0;
	        angular.forEach($scope.fermentablesList, function(item) {
	            total += item.quantity;
	        })
	        total = parseFloat(total.toPrecision(12));
	        return total;
	    };
	    
		$scope.totalOg = function() {
			var total = 0;
			var tsrm = 0;
	        angular.forEach($scope.fermentablesList, function(item) {
	            total += item.og;
	        })			
			var pg = total * ($scope.recipe.efficiency / 100);
			var og = pg/ltToGal($scope.recipe.size);
			$scope.og = Math.floor(og) + 1000;
			return $scope.og;
		}
				
		$scope.showtotalOg = function()	{
			$scope.totalOg();
			return $scope.og.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		
		
		$scope.ogpercent = function()	{
			return Math.min(($scope.og - 1000) * 0.85,100);
		}
		
		$scope.rangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("-");
				rangeL = Math.min((a[0] - 1000) * 0.85,100);
			}
			return rangeL;
		}

		$scope.rangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.og.replace(/\./g,"").split("-");
				var l = (a[0] - 1000) * 0.85;
				var r = (a[1] - 1000) * 0.85;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		
		$scope.totalHop = function() {
	        var totalHop = 0;
	        angular.forEach($scope.hopsList, function(item) {
	            totalHop += item.quantity;
	        })
	        return totalHop;
		};
		
		$scope.totalIbu = function() {
	        var totalIbu = 0;
	        angular.forEach($scope.hopsList, function(item) {
				if(item.step != "Whirlpool" && item.step != "Dry Hop" && item.minutes > 0) {
					var min = item.minutes;
					if(item.step == "First Wort" || item.step == "Mash") min = 20;
					var u = getUtil(min);
					totalIbu += calculateIbu(item.quantity,item.alfa,item.formatType,$scope.recipe.size,u);
				}
	        })
			var ibu = Number(Math.round(totalIbu+'e2')+'e-2');
			$scope.ibu = ibu;
			return ibu;
		};
		
		$scope.ibupercent = function()	{
			return Math.min(($scope.ibu) * 0.83,120);
		}
		
		$scope.ibuRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.ibu.split("-");
				rangeL = Math.min(a[0] * 0.83,120);
			}
			return rangeL;
		}
		
		$scope.ibuRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.ibu.split("-");
				var l = a[0] * 0.83;
				var r = a[1] * 0.83;
				rangeW = r -l; 
			}
			return rangeW;
		};		
		
		$scope.totalSrm = function() {
				var s = calculateSrm($scope.fermentablesList, $scope.recipe.size); 
				$scope.srm = Number(Math.round(s+'e2')+'e-2');
				return $scope.srm;
		};		
		
		$scope.srmPercent = function()	{
			return Math.min(($scope.srm) * 2,50);
		};
		
		$scope.srmRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.srm.split("-");
				rangeL = Math.min(a[0] * 2,50);
			}
			return rangeL;
		};
		
		$scope.srmRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.srm.split("-");
				var l = a[0] * 2;
				var r = a[1] * 2;
				rangeW = r -l; 
			}
			return rangeW;
		};
		
		$scope.totalAbv = function() {
			$scope.abv = calculateAbv($scope.og, $scope.fg);
			return $scope.abv;
		};
		
		$scope.abvPercent = function()	{
			return Math.min(($scope.abv) * 6.6,50);
		};		
		
		$scope.abvRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.abv.split("-");
				rangeL = Math.min(a[0] * 6.6,50);
			}
			return rangeL;
		};
		
		$scope.abvRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.abv.split("-");
				var l = a[0] * 6.6;
				var r = a[1] * 6.6;
				rangeW = r -l; 
			}
			return rangeW;
		};
		
		$scope.estFg = function() {
			var fg = 1000;
			if($scope.yeastsList.length > 0) 
				fg = calculateFg($scope.totalOg(), $scope.yeastsList);
			$scope.fg = fg;
			return fg;
		};
		
		$scope.showEstFg = function() {
			$scope.estFg();
			return $scope.fg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		};
		
		$scope.fgPercent = function()	{
			return Math.min(($scope.fg - 1000) * 0.8,100);
		};
		
		$scope.fgRangeL = function()	{
			var rangeL = "";
			if($scope.style != undefined) {
				var a = $scope.style.fg.replace(/\./g,"").split("-");
				rangeL = Math.min((a[0] - 1000) * 0.8,100);
			}
			return rangeL;
		};

		$scope.fgRangeW = function()	{
			var rangeW = "";
			if($scope.style != undefined) {
				var a = $scope.style.fg.replace(/\./g,"").split("-");
				var l = (a[0] - 1000) * 0.8;
				var r = (a[1] - 1000) * 0.8;
				rangeW = r -l; 
			}
			return rangeW;
		}
		
		$scope.totalYeast = function() {
	        var totalYeast = 0;
	        angular.forEach($scope.yeastsList, function(item) {
	            totalYeast += item.weight;
	        })
	        return totalYeast;
		};
    
		$scope.percent = function(qt) {
	        var total = $scope.total();
					var val = (100 * qt) / total;
					var percent = Number(Math.round(val+'e2')+'e-2');
	        return percent;
		};
		
	    $scope.removeMalt = function(index) {
	        $scope.fermentablesList.splice(index, 1);
	    };	
			
	    $scope.removeHop = function(index) {
	        $scope.hopsList.splice(index, 1);
	    };
		
		$scope.copy = function(index,type) {
			if(type.indexOf("hop") == 0) {
				var item = $scope.hopsList[index];
				var copy = {
					id: item.id,
					name: item.name,
					formatType: item.formatType,
					step: item.step,
					quantity: item.quantity,
					alfa: item.alfa,
					ibu: item.ibu,
					minutes: item.minutes				
				};					
				$scope.hopsList.push(copy);
			}
			else if(type.indexOf("misc") == 0) {
				var item = $scope.miscsList[index];
				var copy = {
						id: item.id,
						name: item.name,
						quantity: item.quantity,
						type: item.type,
						use: item.use
				};					
				$scope.miscsList.push(copy);
			}
					
		};
			
	    $scope.removeYeast = function(index) {
	        $scope.yeastsList.splice(index, 1);
	    };			
		
		$scope.calculateIbu = function(item) {
			var ibu = 0;
			if(item.minutes != 0 && item.quantity != 0 && item.alfa != 0 && $scope.recipe.size != 0 && item.step != "Whirlpool" && item.step != "Dry Hop") {
				var min = item.minutes;
				if(item.step == "First Wort" || item.step == "Mash") min = 20;
				var u = getUtil(min);
				ibu = calculateIbu(item.quantity,item.alfa,item.formatType,$scope.recipe.size,u);
			}
			return Number(Math.round(ibu+'e2')+'e-2');
		}
		
		$scope.calculateOg = function(item) {
			var og = 0;
			var pg = item.pg.substring(item.pg.length-2);
			og = calculateOg($scope.recipe.efficiency, item.quantity, pg);
			item.og = og;
			return Number(Math.round(og+'e2')+'e-2');
		}
		
	    $scope.removeMisc = function(index) {
	        $scope.miscsList.splice(index, 1);
	    };

	    $scope.removeStep = function(index) {
	    	$scope.stepList.splice(index, 1);
	    };
		
		$scope.addStep = function(index) {
			var s = {
				id: index
//				stepType: "";
//				mashType: "",
//				minutes: "",
//				deg:""
			};					
			$scope.stepList.push(s);
		}
		
		$scope.srmClass = function() {
			return "srm"+Math.min(Math.round($scope.srm),40);
		}
					
		$scope.extendDeep = function extendDeep(dst) {
			var l = dst.length;
			angular.forEach(arguments, function(obj) {
				if (obj !== dst) {
					angular.forEach(obj, function(value, key) {
						if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
							dst[key+l] = value
						} else {
							dst[key+l] = value;
						}     
					});   
				}
			});
			//$scope.$apply();
			return dst;
		};
		
		$scope.showComplex = function() {
			$scope.status = false;
			ModalService.showModal({
				templateUrl: "/app/views/fermentables.html",
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
		
		$scope.showHopModal = function() {
			ModalService.showModal({
				templateUrl: "/app/views/hops.html",
				controller: "HopCtrl",
				inputs: {
					title: "Luppoli"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.hopsList = $scope.extendDeep($scope.hopsList, result.itemselected);
				});			
			});
		};			

		$scope.showYeastModal = function() {
			ModalService.showModal({
				templateUrl: "/app/views/yeast.html",
				controller: "YeastCtrl",
				inputs: {
					title: "Lievito"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.yeastsList = $scope.extendDeep($scope.yeastsList, result.itemselected);
				});			
			});
		};			

		$scope.showMiscModal = function() {
			ModalService.showModal({
				templateUrl: "/app/views/misc.html",
				controller: "MiscCtrl",
				inputs: {
					title: "Extra"
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					$scope.miscsList = $scope.extendDeep($scope.miscsList, result.itemselected);
				});			
			});
		};			
	
	}		
]);

beerboxApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('fermentables', {
				url: '/fermentables',
				templateUrl: '/app/views/fermentables.html',
				controller: 'MaltCtrl',
				resolve: {
					postPromise: ['malts', function(malts){
					return malts.getAll();
					}]
				}
			});
		$stateProvider
			.state('hops', {
				url: '/hops',
				templateUrl: '/app/views/hops.html',
				controller: 'HopCtrl'
				,
				resolve: {
					postPromise: ['hops', function(hops){
					return hops.getAll();
					}]
				}
			});			
		$stateProvider
			.state('yeast', {
				url: '/yeast',
				templateUrl: '/app/views/yeast.html',
				controller: 'YeastCtrl'
				,
				resolve: {
					postPromise: ['yeasts', function(yeasts){
					return yeasts.getAll();
					}]
				}
			});				
		$stateProvider
		.state('misc', {
			url: '/misc',
			templateUrl: '/app/views/misc.html',
			controller: 'MiscCtrl'
				,
				resolve: {
					postPromise: ['miscs', function(miscs){
						return miscs.getAll();
					}]
				}
		});				
		
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'RecipeListCtrl',
				resolve: {
					postPromise: ['recipes', function(recipes){
					return recipes.getAll();
					}]
				}					
			});
		
		$stateProvider
			.state('addrecipe', {
				url: '/addrecipe',
				templateUrl: '/app/views/recipe.html',
				controller: 'RecipeCtrl',
				resolve: {			
					malts: function(malts) {
						malts = malts.getAll();
					},
					hops: function(hops) {
						hops = hops.getAll();
					},
					yeasts: function(yeasts) {
						yeasts = yeasts.getAll();
					},
					styles: function(styles) {
						return styles = styles.getAll();
					},
					miscs: function(miscs) {
						return miscs = miscs.getAll();
					},
					result: function() {
						return {
							recipeInfo : {efficiency: "75",size: 25,steps: []},
							fermentablesList : [],
							hopsList : [],
							yeastsList : [],
							miscsList : []
						}
					}
				}
			});		

		$stateProvider
		.state('recipe', {
			url: '/recipe/{id}',
			templateUrl: '/app/views/recipe.html',
			controller: 'RecipeCtrl',
			resolve: {			
				malts:  function(malts) {
					malts = malts.getAll();
				},
				hops: function(hops) {
					hops = hops.getAll();
				},
				yeasts: function(yeasts) {
					yeasts = yeasts.getAll();
				},
				miscs: function(miscs) {
					return miscs = miscs.getAll();
				},
				styles: function(styles) {
					return styles = styles.getAll();
				},				
				result: function($stateParams, recipes) {
					return recipes.get($stateParams.id);
				}
			}			
		});		
			
		$urlRouterProvider.otherwise('home');
	}
]);
