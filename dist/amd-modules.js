'use strict';

require.config({
//	urlArgs: 'v='+(new Date()).getTime(), // uncomment is you want full application reload
    baseUrl: '.',
	paths: {
		/* requirejs plugins */
		'domReady': 'bower_components/requirejs-domready/domReady',
		'text': 'bower_components/requirejs-text/text',
		/* external libs */
		'jquery': 'bower_components/jquery/jquery',
		'underscore': 'bower_components/underscore/underscore',
		'angular': 'bower_components/angular/angular',
		'angular-route': 'bower_components/angular-route/angular-route',
		'angular-resource': 'bower_components/angular-resource/angular-resource',
		'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
		'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
		'firebase': 'bower_components/firebase/firebase',
		'angularfire': 'bower_components/angularfire/angularfire',
		'showdown': 'bower_components/showdown/compressed/showdown',
		/* application */
		'app': 'scripts/app',
		'app-filters': 'scripts/filters/filters',
		'app-directives': 'scripts/directives/main',
		'app-services': 'scripts/services/main',
		'app-main-ctrl': 'scripts/controllers/main',
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
		},
		'firebase': {
			exports: 'Firebase'
		},
		'angularfire': {
			deps: ['angular', 'firebase']
		},
		'showdown': {
			exports: "Showdown"
		}
	}
});

