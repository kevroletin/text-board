// An example configuration file.
exports.config = {

	// TODO: share config with Gruntfile
	//baseUrl: 'http://localhost:9001/',
	// TODO: make it portable
	baseUrl: 'http://localhost/wcs-client/app',

	// TODO: make it portable
	seleniumServerJar: '/usr/lib/node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar',
	chromeDriver: '/usr/lib/node_modules/protractor/selenium/chromedriver',

	// Uncomment if you want use running server
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	//seleniumPort: null,

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	specs: [
		'./e2e/*.js'
	],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
