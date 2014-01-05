'use strict';

define(['underscore', 'app'],
	   function(_, app)
{
	app.controller('MainCtrl', function ($scope, $http, $log) {
		$scope.coolData =
			[{name: 'cat', href: 'images/cat.jpg'}];
	});
});
