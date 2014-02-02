'use strict';

define(['chai-expect', 'app-filters'], function(want) {
	function initTest(callback) {
		beforeEach(function() {
			module('appFilters');
			inject(callback);
		});
	}

	describe('check joinBy filter:', function() {
		var joinBy;
		initTest(function(joinByFilter) {
			joinBy = joinByFilter;
		});

		it('check inject mechanizm', function() {
			expect(joinBy).toBeDefined();
		});

		it('join with default separator', function() {
			var data = [1, 2, 3, 4, 5];
			expect(joinBy(data)).toBe('1,2,3,4,5');
		});

		it('join with custom separator', function() {
			var data = [1, 2, 3, 4, 5];
			expect(joinBy(data, '-')).toBe('1-2-3-4-5');
		});

		it('join array of strings', function() {
			var data = ['hello', 'world'];
			expect(joinBy(data, ' ')).toBe('hello world');
		});

		it('join array with one element', function() {
			var data = ['hello'];
			expect(joinBy(data, ' ')).toBe('hello');
		});

		it('join empty array', function() {
			expect(joinBy([])).toBe('');
			expect(joinBy([], ' ')).toBe('');
		});

		it('join undefined', function() {
			expect(joinBy()).toBe('');
		});
	});

	describe('withDefault filter: ', function() {
		var filter;
		initTest(function(withDefaultFilter) {
			filter = withDefaultFilter;
		});

		it('defined value(string)', function() {
			want(filter('value', 'default')).to.equal('value');
		});

		it('defined value(array)', function() {
			want(filter([123], 'default')).to.deep.equal([123]);
		});

		it('defined value(number)', function() {
			want(filter(10, 'default')).to.equal(10);
		});

		it('zero is defined value', function() {
			want(filter(0, 'default')).to.equal(0);
		});

		it('null', function() {
			want(filter(null, 'default')).to.equal('default');
		});

		it('undefined', function() {
			want(filter(undefined, 'default')).to.equal('default');
		});

		it('empty string', function() {
			want(filter('', 'default')).to.equal('default');
		});

		it('blank string is not empty', function() {
			want(filter('   ', 'default')).to.equal('   ');
		});

		it('default ballback is empty string', function() {
			want(filter()).to.equal('');
		});
	});

	describe('reverse filter: ', function() {
		var filter;
		initTest(function(reverseFilter) {
			filter = reverseFilter;
		});

		it('reverse is reverse', function() {
			want(filter([1, 2, 3])).to.deep.equal([3, 2, 1]);
		});

		it('reverse preserve references', function() {
			var obj = { key: 'value' };
			want(filter([obj])[0]).to.equal(obj);
		});
	});

	describe('startFrom filter: ', function() {
		var filter;
		initTest(function(startFromFilter) {
			filter = startFromFilter;
		});

		it('startFrom is startFrom', function() {
			want(filter([1, 2, 3], 2)).to.deep.equal([3]);
		});
	});

	describe('notDislikedBy filter: ', function() {
		var filter;
		initTest(function(notDislikedByFilter) {
			filter = notDislikedByFilter;
		});

		it('array without "deletedBy" field', function() {
			want(filter([1, 2, 3])).to.deep.equal([1, 2, 3]);
		});

		it('"deletedBy" is array of values', function() {
			var data = [
				{ text: 'cool post',
				  deletedBy: ['user1', 'user2'] },
				{ text: 'without deletedBy' },
				{ text: 'cool post2',
				  deletedBy: ['user1'] },
			];
			var ansUser1 = [
				{ text: 'without deletedBy' },
			];
			var ansUser2 = [
				{ text: 'without deletedBy' },
				{ text: 'cool post2',
				  deletedBy: ['user1'] },
			];
			want( filter(data, 'user1') ).to.deep.equal( ansUser1 );
			want( filter(data, 'user2') ).to.deep.equal( ansUser2 );
		});
	});

	describe('notDislikedBy filter: ', function() {
		var filter;
		initTest(function(lenInBracketsFilter) {
			filter = lenInBracketsFilter;
		});

		it('undefined as input', function() {
			want(filter(undefined)).to.equal('');
		});

		it('array as input', function() {
			want(filter([1, 2, 3])).to.equal('(3)');
		});

		it('object as input', function() {
			want(filter({a: 1, b: 2, c: 3})).to.equal('(3)');
		});
	});
});
