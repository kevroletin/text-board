'use strict';

define(['underscore', 'app'], function(_, app) {
	app.filter('joinBy', function () {
		return function (input, delimiter) {
			return (input || []).join(delimiter || ',');
		};
	});
	app.filter('withDefault', function () {
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
	});
	app.filter('reverse', function () {
		return function (input) {
			return _(input).reverse();
		};
	});
	app.filter('startFrom', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		};
	});
	app.filter('likedBy', function() {
		return function(input, username) {
			return _(input).filter(function(x) {
				if (x.deletedBy) {
					return !_(x.deletedBy).contains(username);
				}
				return true;
			});
		};
	});
});
