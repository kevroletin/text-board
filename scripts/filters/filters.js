'use strict';

define(['underscore', 'angular'], function(_, angular) {
	return angular.module('appFilters', [])
	.filter('joinBy', function () {
		return function (input, delimiter) {
			return (input || []).join(delimiter || ',');
		};
	})
	.filter('withDefault', function () {
		return function (input, defaultValue) {
			if (!defaultValue) {
				defaultValue = '';
			}
			if (_(input).isEmpty()) {
				return defaultValue;
			} else {
				return input;
			}
		};
	})
	.filter('reverse', function () {
		return function (input) {
			return _(input).reverse();
		};
	})
	.filter('startFrom', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		};
	})
	.filter('notDislikedBy', function() {
		return function(input, username) {
			return _(input).filter(function(x) {
				if (x.deletedBy) {
					return !_(x.deletedBy).contains(username);
				}
				return true;
			});
		};
	})
	.filter('inBrackets', function() {
		return function(input) {
			return _(_(input).map(function(x) {
				if ( x ) {
					return '(' + x + ')';
				} else {
					return '';
				}
			})).join(',');
		};
	});
});
