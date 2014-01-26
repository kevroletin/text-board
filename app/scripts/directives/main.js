'use strict';

define(['app', 'underscore'], function(app, _) {
	app.directive('myExpandable', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			scope: {
				'myModel': '=',
				'mySubmit': '&'
			},
			templateUrl: 'views/expand-input.html',
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
	});
	app.directive('myPaginator', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			templateUrl: 'views/paginator.html',
		};
	});
});
