module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', 'chai', '@angular/cli'],
		plugins: [
			require('karma-chai'),
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-mocha-reporter'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('karma-junit-reporter'),
			require('@angular/cli/plugins/karma')
		],
		client:{
			clearContext: false
		},
		coverageIstanbulReporter: {
			reports: [ 'html', 'lcovonly' ],
			fixWebpackSourcePaths: true
		},
		angularCli: {
			environment: 'dev'
		},
		reporters: ['mocha', 'kjhtml', 'junit', 'coverage-istanbul'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};
