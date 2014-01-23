'use strict';

define(['underscore', 'app', 'firebase', 'angularfire'],
	   function(_, app, Firebase)
{
	app.controller('MainCtrl', function ($scope, $firebase, $http, $log, firebaseCollection) {
		$scope.showForm = true;
		$scope.index = $firebase(new Firebase('https://picture-board.firebaseio.com/index'));
		// TODO: init $scope.index
		$scope.posts = firebaseCollection('https://picture-board.firebaseio.com/test');
		$scope.addNewPost = function() {
			if ($scope.new) {
				$scope.new.i = $scope.getIndex();
				$scope.posts.$add($scope.new);
				$scope.new = null;
			}
		};
		$scope.deletePost = function(key) {
			$log.info(key);
			$scope.posts.$remove(key);
		};
		$scope.getIndex = function() {
			var res = $scope.index.$value;
			$scope.index.$set(res + 1);
			return res;
		};

	});
});
