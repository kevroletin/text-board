'use strict';

define(['underscore',
		'chai-expect',
		'app-main-ctrl',
	    ''],
	function(_, want) {

	describe('local backed: ', function() {
		var posts;
		var postsFactory;

		beforeEach(module('appModel'));

		/* force local storage instead of firebase */
		beforeEach(module(function($provide) {
			$provide.constant( 'env', { backend: 'local' } );
		}));

		beforeEach(inject(function($rootScope, $injector, _posts_) {
			postsFactory = _posts_;
			posts = postsFactory(function() {});
		}));

		it('posts defined', function() {
			want( posts ).to.not.be.null;
		});

		it('check backend name', function() {
			want( posts.getBackendName ).to.be.a('function');
			want( posts.getBackendName() ).to.equal('local');
		});

		it('check interface', function() {
			want( posts.addPost ).to.be.a('function');
			want( posts.addToField ).to.be.a('function');
			want( posts.addComment ).to.be.a('function');
			want( posts.deleteAll ).to.be.a('function');
		});

		it('delete all', function() {
			posts.deleteAll();
			want( posts.length ).to.equal( 0 );
		});

		it('add posts', function() {
			posts.deleteAll();
			posts.addPost( {text: 'good day'} );
			want( posts.length ).to.equal( 1 );
			want( posts[0].text ).to.equal( 'good day' );
			want( posts[0].$id ).to.not.be.null;
		});

		it('add several posts', function() {
			posts.deleteAll();
			posts.addPost( {text: 'good day'} );
			posts.addPost( {text: 'special day'} );
			want( posts.length ).to.equal( 2 );
			want( posts[0].text ).to.equal( 'good day' );
			want( posts[0].$id ).to.not.be.null;
			want( posts[1].text ).to.equal( 'special day' );
			want( posts[1].$id ).to.not.be.null;
		});

		it('add comments', function() {
			var comments = ['good post',
							'special post'];
			posts.deleteAll();
			posts.addPost( {text: 'good day'} );
			posts.addPost( {text: 'special day'} );
			posts.addComment(posts[0], comments[0]);
			posts.addComment(posts[0], comments[1]);

			want( posts[0].comments ).to.deep.equal( comments );
		});

		it('add likedBy', function() {
			var users = ['user1', 'user2'];
			posts.deleteAll();
			posts.addPost( {text: 'good day'} );
			posts.addPost( {text: 'special day'} );
			posts.addToField(posts[0], 'likedBy', users[0]);
			posts.addToField(posts[0], 'likedBy', users[1]);

			want( posts[0].likedBy ).to.deep.equal( users );
		});
	});

	describe('main controller: ', function() {
		var $scope;
		var $timeout;

		beforeEach(module('appMainCtrl'));

		/* force local storage instead of firebase */
		beforeEach(module(function($provide) {
			$provide.constant( 'env', { backend: 'local' } );
		}));

		beforeEach(inject(function($rootScope, $controller, _$timeout_) {
			var injectConfig;
			$scope = $rootScope.$new();
			$timeout = _$timeout_;
			injectConfig = {
				$scope: $scope,
				env: { backend: 'local' }
			};
			$controller('MainCtrl', injectConfig);
		}));

		it('scope is defined', function() {
			want( $scope ).to.exist;
		});

		it('loading... is first post with local backend', function() {
			want( $scope.posts[0].title ).to.equal( 'Rendering...' );
		});

		it('storage is local', function() {
			$timeout.flush();
			want( $scope.posts.getBackendName() ).to.equal( 'local' );
		});

		it('add new post is local', function() {
			var newPost = { title: 'I am title',
						    text: 'I am text',
						    img: 'http://picture.domain.com' };
			$timeout.flush();
			$scope.newPost = newPost;
			$scope.addNewPost();
			want( _($scope.posts).last().title ).to.equal( newPost.title );
			want( _($scope.posts).last().text ).to.equal( newPost.text );
			want( _($scope.posts).last().img ).to.equal( newPost.img );
		});
	});
});
