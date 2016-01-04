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
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari'
    },
    'SL_IE_9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
    'SL_IE_10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_IE_11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11'
    },
    'SL_iOS': {
      base: "SauceLabs",
      browserName: "iphone"
    },
    'SL_Android': {
      base: "SauceLabs",
      browserName: "android"
    }
  };

  var conf = {
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

    captureTimeout: 0,

    browserNoActivityTimeout: 120000,

    sauceLabs: {
      testName: 'Recapture.io analytics library',
      startConnect: true,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY
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
  };

  if (process.env.TRAVIS_JOB_NUMBER) {
    conf.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  }

  if (process.env.TRAVIS) {
    var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    conf.build = buildLabel
    conf.logLevel = config.LOG_DEBUG;
    conf.sauceLabs.startConnect = false;
  }

  config.set(conf);
};
