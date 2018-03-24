// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporterModule = require('jasmine-spec-reporter');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:3000/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      noProject:true
    });
  },
  onPrepare: function() {
    console.dir(SpecReporterModule.SpecReporter);
    jasmine.getEnv().addReporter(new SpecReporterModule.SpecReporter());
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'output/reporter/',
        screenshotsFolder: 'screens/',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        showPassed: false,
        fileName: 'e2eReport'
      })
    );
  }
};
