'use strict';

define(['app-filters'], function() {
	describe('check joinBy filter', function() {
		var joinBy;

		beforeEach(function() {
			module('appFilters');
			inject(function(joinByFilter) {
				joinBy = joinByFilter;
			});
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
	});
});
