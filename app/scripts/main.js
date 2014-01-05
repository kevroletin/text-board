'use strict';

/**
 * This file
 *   1. defines aplication bootstrap code;
 *   2. loads and applies amd-modules configuration;
 *   2. executes bootstrap code.
 *
 * It is required to separate amd-modules configuration and bootstrap into two files.
 * Configuration inside separate file is required to avoid duplication between tests
 *  and application.
 */

define('scripts/main',
	   ['angular', 'app', 'appMainCtrl', 'app-filters', 'domReady!'],
	   function(angular, app)
{
	try {
		angular.bootstrap(document, ['App']);
	} catch(e) {
		console.log(e);
	}
});

/* require('../amd-modules') doesn't works after r.js optimization for some reason; */
require({ paths: { 'amd-modules': '../amd-modules' }},
		['amd-modules'],
		function()
{
	require(['scripts/main'], function() {
		/* Bootstrap code is not here because r.js dependency tracker searches deps only
         * inside top-lever require/define calls. */
	});
});
