'use strict';

require.config({
//	urlArgs: 'v='+(new Date()).getTime(), // uncomment is you want full application reload
    baseUrl: '.',
	paths: {
		'domReady': 'bower_components/requirejs-domready/domReady',
		'text': 'bower_components/requirejs-text/text',
		'jquery': 'bower_components/jquery/jquery',
		'underscore': 'bower_components/underscore/underscore',
		'app': 'scripts/app',
		'app-filters': 'scripts/filters/filters',
		'appMainCtrl': 'scripts/controllers/main',
		'angular': 'bower_components/angular/angular',
		'angular-route': 'bower_components/angular-route/angular-route',
		'angular-resource': 'bower_components/angular-resource/angular-resource',
		'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
		'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize'
	},

	shim: {
		'angular': {
			exports: 'angular',
			deps: ['jquery']
		},
		'angular-route':    { deps: ['angular'] },
		'angular-resource': { deps: ['angular'] },
		'angular-cookies':  { deps: ['angular'] },
		'angular-sanitize': { deps: ['angular']	},
		jquery: {
			exports: '$',
		},
		underscore: {
			exports: '_'
		}
	}
});

