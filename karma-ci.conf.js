module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    process.env.SAUCE_USERNAME = require('./saucelabs').username;
    process.env.SAUCE_ACCESS_KEY = require('./saucelabs').key;
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_InternetExplorer': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_FireFox': {
      base: 'SauceLabs',
      browserName: 'firefox',
    }
  };

  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-spec-reporter'),
      require('karma-sauce-launcher')
    ],

    basePath: '',

    logLevel: config.LOG_INFO,

    browsers: Object.keys(customLaunchers),

    customLaunchers: customLaunchers,

    singleRun: true,

    frameworks: ['tap'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    reporters: ['spec', 'saucelabs'],

    colors: true,

    captureTimeout: 120000,

    sauceLabs: {
      startConnect: false,
      testName: 'Karma and Sauce Labs demo',
      recordScreenshots: true,
      connectOptions: {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        port: 5757,
        logfile: 'sauce_connect.log'
      }
    },

    port: 9876,

    webpack: {
      node: {
        fs: 'empty'
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  });
};
