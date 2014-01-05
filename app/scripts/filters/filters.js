'use strict';

define(['app',], function(app) {
	app.filter('joinBy', function () {
		return function (input, delimiter) {
			return (input || []).join(delimiter || ',');
		};
	});
});
