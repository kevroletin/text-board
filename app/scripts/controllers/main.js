'use strict';

define(['underscore', 'angular', 'firebase', 'angularfire', 'angular-firebase-collection', 'app-directives', 'app-services'],
	   function(_, angular, Firebase)
{
	angular.module('appConfig', [
		'appEnvUtils'
	])
	.constant('firebaseUrl', 'https://picture-board-dev.firebaseio.com/')
	.constant('envReverence', { backend: ['local', 'firebase'] })
	.constant('envConfig', { backend: 'firebase' });

	angular.module('appModel', [
		'firebase',
		'ng-firebase'
	])
	.factory('posts', function($log, $firebase, firebaseCollection, firebaseUrl, env) {
		function makeLocalStorage() {
			var res =  [
				{text: 'hello world'},
				{text: 'I am the best'}
			];
			_(res).each(function(x, i) {
				x.$id = i;
			});
			res.addPost = function(post) {
				post.$id = res.length;
				res.push(post);
			};
			res.addToField = function(post, field, data) {
				post[field] = _(post[field] || []).push(data);
			};
			res.addComment = function(post, comment) {
				res.addToField(post, 'comments', comment);
			};
			return res;
		}
		function connectToFirebase() {
			var res = firebaseCollection(firebaseUrl + 'test');
			res.addPost = function(post) {
				res.$add(post);
			};
			res.addToField = function(post, field, data) {
				post[field] = _(post[field] || []).push(data);
				res.$update(post);
			};
			res.addComment = function(post, comment) {
				var path = firebaseUrl + 'test/' + post.$id + '/comments';
				$firebase(new Firebase(path)).$add( comment );
			};
			return res;
		}
		if ( env.backend === 'firebase' ) {
			return connectToFirebase();
		}
		return makeLocalStorage();
	});

	return angular.module('appMainCtrl', [
		'appConfig',
		'appModel',
		'appDirectives',
		'ngCookies',
	])
	.controller('MainCtrl',
		function ($scope, $http, $log, $document, $timeout, $cookies, posts)
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
		$scope.posts = posts;
		$scope.addNewPost = function() {
			if ($scope.newPost &&
				!_($scope.newPost).every(_.isEmpty))
			{
				$scope.newPost.comments = [];
				$scope.posts.addPost($scope.newPost);
				$scope.newPost = null;
			}
		};
		/* used for like, dislike, delete features */
		$scope.addToPostField = function(post, field) {
			if (!_(post[field] || []).contains($scope.username)) {
				$scope.posts.addToField(post, field, $scope.username);
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
			if ( _($scope.newComment).isEmpty() ) {
				return;
			}
			$scope.posts.addComment(post, $scope.newComment);
			$scope.newComment = {};
			$timeout(function() {
				$document.find('.commentTextarea').focus();
			});
		};
	});
});
