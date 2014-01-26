'use strict';

define(['underscore', 'app', 'firebase', 'angularfire'],
	   function(_, app, Firebase)
{
	app.constant('firebaseUrl', 'https://picture-board.firebaseio.com/');
	app.controller('MainCtrl', function ($scope, $firebase, $http, $log, $document, $timeout, $cookies, firebaseCollection, firebaseUrl) {
		$scope.generateUsername = function() {
			var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
				       'abcdefghijklmnopqrstuvwxyz' +
				       '0123456789';
			$scope.username = _(_.sample(alph, 15)).join('');
			$cookies.username = $scope.username;
			$scope.firstTimeHere = true;
		};
		if ($cookies.username) {
			$scope.username = $cookies.username;
		} else {
			$scope.generateUsername();
		}

		$scope.currentPage = 0;
		$scope.pageSize = 30;
		$scope.showForm = true;
		$scope.index = $firebase(new Firebase(firebaseUrl + 'index'));
		$scope.posts = firebaseCollection(firebaseUrl + 'test');
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
			if ( !res ) {
				res = 1;
			}
			$scope.index.$set(res + 1);
			return res;
		};

	});
});
