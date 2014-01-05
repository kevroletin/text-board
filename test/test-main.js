'use strict';

require.config({
    baseUrl: '/base/app',
	paths: {
		'chai': 'bower_components/chai/chai',
		'chai-expect': '../test/utils/chai-expect',
	}
});

require(['underscore'], function(_) {
	var runOnly = _(
		[ /* put here test name */
	    ]).map(function(x) {
		return './../test/spec/' + x;
	});
	var tests = [];
	for (var file in window.__karma__.files) {
		if (window.__karma__.files.hasOwnProperty(file)) {
			if (/\/base\/test\/spec.*\.js/.test(file)) {
				tests.push(file);
			}
		}
	}

	require((runOnly.length ? runOnly : tests), function() {
		window.__karma__.start();
	});
});


