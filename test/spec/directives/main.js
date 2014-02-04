'use strict';

define(['chai-expect', 'app-directives'], function(want) {
    describe('play with paginator: ', function() {
		var $compile;
		var $rootScope;
		var element;

		beforeEach(module('appDirectives'));
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;

			$rootScope.currentPage = 0;
			$rootScope.posts = [1, 2, 3];
			$rootScope.pageSize = 2;

			element = $compile('<div my-paginator></div>')($rootScope);
			$rootScope.$digest();
		}));

		it('html template compiled', function() {
			want( element.find('div').size() ).to.equal( 1 );
			want( element.find('button').size() ).to.equal( 2 );
		});

		it('click forward button cause page change', function() {
			element.find('button').last().click();
			$rootScope.$digest();
			want( $rootScope.currentPage ).to.equal( 1 );
		});

		it('click backward button cause page change', function() {
			element.find('button').last().click();
			$rootScope.$digest();
			element.find('button').first().click();
			$rootScope.$digest();
			want( $rootScope.currentPage ).to.equal( 0 );
		});
    });

    describe('play with expandable: ', function() {
		var $compile;
		var $rootScope;
		var element;
		var good = false;

		beforeEach(module('appDirectives'));
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;

			$rootScope.data = '123';
			$rootScope.callback = function() {
				good = true;
			};

			element = $compile('<my-expandable my-model="data" my-submit="callback()"></my-expandable>')($rootScope);
			$rootScope.$digest();
		}));

		it('html template compiled', function() {
			want( element.find('input').size() ).to.equal( 1 );
			want( element.find('textarea').size() ).to.equal( 1 );
		});

		it('directive uses isolate scope', function() {
			want( $rootScope.showEditBox ).to.be.undefined;
		});

		it('html template compiled', function() {
			element.find('input').focus();
			$rootScope.$digest();
			// TODO: check that textarea is focused
			// TODO: chekc how to obtain directive controller here
		});
    });
});
