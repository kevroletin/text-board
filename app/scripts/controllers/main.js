'use strict';

define(['underscore', 'app', 'angularfire'],
	   function(_, app)
{
	app.controller('MainCtrl', function ($scope, $http, $log) {
		$scope.coolData =
			[{name: 'cat', href: 'images/cat.jpg'}];
	});
});
