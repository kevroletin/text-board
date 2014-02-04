'use strict';

describe('play', function() {
	it('get /', function() {
		browser.get('');
	});
	it('check greeting', function() {
		expect($('p.greeting').isPresent()).toBe(true);
	});
});
