/* editor.js */

'use strict';

define(['underscore', 'angular',
		'text!views/editor.html',
		'app-filters'],
	   function(_, angular, editorHtml) {
	return angular.module('editor', [
		'appFilters'
	])
	.directive('myEditor', function($log, $document, $timeout) {
		return {
			restrict: 'AE',
			scope: {
				parentPost: '=',
				action: '&',
				enhanced: '=',
				collapsable: '='
			},
			template: editorHtml,
			link: function(scope, elem, attr) {
				scope.active = !scope.collapsable;
				scope.text = '';
				scope.picture = '';
				scope.youtube = '';

				/* got from http://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery */
				function insertAtCaret(txtarea,text) {
					var scrollPos = txtarea.scrollTop;
					var strPos = 0;
					var range;
					var br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
						'ff' : (document.selection ? 'ie' : false ) );
					if (br === 'ie') {
						txtarea.focus();
						range = document.selection.createRange();
						range.moveStart ('character', -txtarea.value.length);
						strPos = range.text.length;
					}
					else if (br === 'ff') {
						strPos = txtarea.selectionStart;
					}

					var front = (txtarea.value).substring(0,strPos);
					var back = (txtarea.value).substring(strPos,txtarea.value.length);
					txtarea.value=front+text+back;
					strPos = strPos + text.length;
					if (br === 'ie') {
						txtarea.focus();
						range = document.selection.createRange();
						range.moveStart ('character', -txtarea.value.length);
						range.moveStart ('character', strPos);
						range.moveEnd ('character', 0);
						range.select();
					}
					else if (br === 'ff') {
						txtarea.selectionStart = strPos;
						txtarea.selectionEnd = strPos;
						txtarea.focus();
					}
					txtarea.scrollTop = scrollPos;
				}

				scope.toggle = function() {
					if (!scope.collapsable) {
						return;
					}
					scope.active = !scope.active;

					if (scope.active) {
						$timeout(function() {
							scope.$broadcast('focusOn', '');
						});

						/* TODO: insert selected text as quote on form open */
					}
				};
				scope.blur = function() {
					if ( scope.text ) {
						return;
					}
					//scope.toggle();
				};
				scope.keyDown = function(event) {
					if ( (event.ctrlKey || event.metaKey) && event.keyCode === 13) {
						scope.Submit();
						event.preventDefault();
					} else if (event.keyCode === 27) {
						scope.toggle();
						event.preventDefault();
					} else if ( !(event.ctrlKey || event.metaKey) && event.keyCode === 9 ) {
						insertAtCaret(event.target, '\t');
						event.preventDefault();
					}
				};
				scope.cancel = function() {
					scope.text = '';
					scope.youtube = '';
					scope.picture = '';
					scope.toggle();
				};
				scope.submit = function() {
					var post = {};
					post.text = scope.text;
					post.img = scope.picture;
					post.youtube = scope.youtube;
					scope.action( {parentPost: scope.parentPost, post: post} );
					scope.cancel();
				};
				scope.clearPicture = function() {
					scope.picture = '';
				};
				scope.clearYoutube = function() {
					scope.youtube = '';
				};
			}
		};
	})
	.directive('autoFocus', function($timeout) {
		return	function(scope, elem, attr) {
			scope.$on('focusOn', function(ev, name) {
				$timeout(function() {
					elem[0].focus();
				}, 0);
			});
		};
	});
});
