'use strict';

define(['underscore', 'angular'],
	   function(_, angular)
{
	return angular.module('appEnvUtils', [
	])
	.factory('envValidator', function($log) {
		function validate(conf, reference) {
			var res = {};
			_(conf).map(function(v, k) {
				if ( !reference[k] ) {
					$log.error('invalid config key: ', k);
				}
			});
			_(reference).each(function(v, k) {
				if ( _(reference[k]).contains(conf[k]) ) {
					res[k] = conf[k];
				} else {
					$log.error('invalid value ', conf[k], ' for key ', k);
					res[k] = reference[k][0];
				}
			});
			return res;
		}
		return validate;
	})
	.factory('env', function(envConfig, envReverence, envValidator) {
		return envValidator(envConfig, envReverence);
	});
});
