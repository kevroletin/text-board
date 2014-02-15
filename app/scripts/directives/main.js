'use strict';

define(['underscore', 'angular',
		'text!views/paginator.html',
		'app-filters'],
	   function(_, angular, paginatorHtml) {
	return angular.module('appDirectives', [
		'appFilters'
	])
	.directive('myPaginator', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			template: paginatorHtml
		};
	});
});
