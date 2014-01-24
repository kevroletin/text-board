'use strict';

define(['app', 'underscore'], function(app, _) {
	app.directive('myExpandable', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			scope: {
				'myModel': '=myModel'
			},
			templateUrl: 'views/expand-input.html',
			link: function($scope, elem, attr) {
				$scope.showEditBox = true;
				$scope.$watch('showEditBox', function() {
					$log.info('good');
					if ( !$scope.showEditBox ) {
						var textArea = $document.find('.expand-input');
						$log.info('good');
						$timeout(function() {
							textArea.focus();
						});
					}
				});
			}
		};
	});
});
