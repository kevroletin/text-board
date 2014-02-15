'use strict';

define(['underscore', 'angular',
		'text!views/paginator.html',
		'text!views/expand-input.html',
		'app-filters'],
	   function(_, angular, paginatorHtml, expandableHtml) {
	return angular.module('appDirectives', [
		'appFilters'
	])
	.directive('myExpandable', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			scope: {
				'myModel': '=',
				'mySubmit': '&'
			},
			template: expandableHtml,
			link: function($scope, elem, attr) {
				$scope.showEditBox = true;
				$scope.$watch('showEditBox', function() {
					if ( !$scope.showEditBox ) {
						var textArea = $document.find('.expand-input');
						$timeout(function() {
							textArea.focus();
						});
					}
				});
				$scope.keydown = function(event) {
					/* ctrl + enter pressed */
					if (event.ctrlKey && event.keyCode === 13) {
						$scope.mySubmit();
					}
				};
			}
		};
	})
	.directive('myPaginator', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			template: paginatorHtml
		};
	});
});
