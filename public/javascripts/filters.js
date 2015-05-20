'use strict';

/* Filters */

angular.module('beerboxFilters', []).filter('checkmark', function() {
	return function(input) {
		return input ? '\u2713' : '\u2718';
	}
});	