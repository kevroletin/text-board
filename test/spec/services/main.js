'use strict';

define(['underscore',
		'chai-expect',
		'app-services',
	    ''],
	function(_, want) {

	describe('env validator: ', function() {
		var env;
		var envReverence = {
			both: ['both-one', 'both-two'],
			onlyRef: ['onlyRef-1', 'onlyRef-1'],
			wrong: ['good-1', 'good-2'],
		};
		var envConfig = {
			both: 'both-two',
			onlyConf: 'onlyConf-1',
			wrong: 'bad',
		};
		beforeEach(module('appModel'));

		beforeEach(module(function($provide) {
			$provide.constant('envReverence', envReverence);
			$provide.constant('envConfig', envConfig);
		}));

		beforeEach(inject(function(_env_) {
			env = _env_;
		}));

		it('right config exists', function() {
			want( env.both ).to.equal( 'both-two' );
		});

		it('wrong config falled back to default', function() {
			want( env.wrong ).to.equal( 'good-1' );
		});

		it('missed config falled back to default', function() {
			want( env.onlyRef ).to.equal( 'onlyRef-1' );
		});

	});
});
