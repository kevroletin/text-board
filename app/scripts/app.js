'use strict';

define(['angular',
		'angular-route',
		'angular-resource',
		'angular-cookies',
		'angular-sanitize',
		'showdown',
		'app-main-ctrl',
		'app-filters',
		'app-directives',
		'editor',
		],
function(angular) {
	return angular.module('app', [
		'appMainCtrl',
		'appDirectives',
		'appFilters',
		'ngRoute',
		'ngSanitize',
		'editor',
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
});
