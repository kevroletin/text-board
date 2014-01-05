'use strict';

define(['angular',
		'angular-route',
		'angular-resource',
		'angular-cookies',
		'angular-sanitize'],
function(angular) {
	return angular.module('App', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute'
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
