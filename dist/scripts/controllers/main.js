'use strict';

define(['underscore', 'angular', 'firebase', 'angularfire', 'angular-firebase-collection', 'app-directives'],
	   function(_, angular, Firebase)
{
	return angular.module('appMainCtrl', [
		'appDirectives',
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'firebase',
		'ng-firebase'
	])
	.constant('firebaseUrl', 'https://picture-board.firebaseio.com/')
	.controller('MainCtrl',
		function ($scope, $firebase, $http, $log, $document, $timeout, $cookies, firebaseCollection, firebaseUrl)
	{
		$scope.generateUsername = function() {
			var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
				       'abcdefghijklmnopqrstuvwxyz' +
				       '0123456789';
			$scope.username = _(_.sample(alph, 10)).join('');
			$cookies.username = $scope.username;
			$scope.firstTimeHere = true;
		};
		if ($cookies.username) {
			$scope.username = $cookies.username;
		} else {
			$scope.generateUsername();
		}

		$scope.newComment = {};
		$scope.newPost = null;
		$scope.currentPage = 0;
		$scope.pageSize = 30;
		$scope.showForm = true;
		$scope.posts = firebaseCollection(firebaseUrl + 'test');
		$scope.addNewPost = function() {
			if ($scope.newPost &&
				!_($scope.newPost).every(_.isEmpty))
			{
				$scope.newPost.comments = [];
				$scope.posts.$add($scope.newPost);
				$scope.newPost = null;
			}
		};
		/* used for like, dislike, delete features */
		$scope.addToPostField = function(post, field) {
			if (!post[field]) {
				post[field] = [];
			}
			if (!_(post[field]).contains($scope.username)) {
				_(post[field]).push($scope.username);
				$scope.posts.$update(post);
			}
		};
		$scope.commentOnCtrlEnter = function(event, post) {
			if (event.ctrlKey && event.keyCode === 13) {
				$scope.addComment(post);
				$timeout(function() {
					$document.find('.commentTextarea').focus();
				});
			}
		};
		$scope.editCommentFocus = function() {
			if ($scope.hideEditTimeout) {
				$timeout.cancel($scope.hideEditTimeout);
			}
			$scope.hideEditTimeout = null;
		};
		$scope.editCommentBlur = function() {
			if ( _($scope.newComment.text).isEmpty() ) {
				$scope.hideEditTimeout = $timeout(function() {
					$scope.editCommentId = '';
				}, 500);
			}
		};
		$scope.setEditCommentId = function(id) {
			$scope.editCommentId = id;
			$timeout(function() {
				$document.find('.commentTextarea').focus();
			});
		};
		$scope.addComment = function(post) {
			var path;
			if ( _($scope.newComment).isEmpty() ) {
				return;
			}
			if ( !post.comments ) {
				post.comments = [];
			}
			path = firebaseUrl + 'test/' + post.$id + '/comments';
			$firebase(new Firebase(path)).$add( $scope.newComment );
			$scope.newComment = {};
			$timeout(function() {
				$document.find('.commentTextarea').focus();
			});
		};
	});
});
