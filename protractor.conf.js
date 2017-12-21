const { SpecReporter } = require('jasmine-spec-reporter');

const XMLReporter = require('ruru-protractor-junit-reporter');


exports.config = {
	allScriptsTimeout: 11000,
	specs: [
		'./e2e/**/*.e2e-spec.ts'
	],
	capabilities: {
		'browserName': 'chrome'
	},
	directConnect: true,
	baseUrl: 'http://localhost:4200/',
	framework: 'jasmine',
	resultJsonOutputFile : './e2e/results.json',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
	},
	onPrepare() {
		require('ts-node').register({
			project: './e2e/tsconfig.e2e.json'
		});
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
	},
	afterLaunch: (exitCode) => {
		return new Promise((res, rej) => {
			const reporter = new XMLReporter({
				title : 'E2E Test Results',
				xmlReportDestPath : './e2e/results.xml'
			});

			reporter.generateXMLReport(exports.config.resultJsonOutputFile);
		});
	}
};
