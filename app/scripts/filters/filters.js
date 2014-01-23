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
});
