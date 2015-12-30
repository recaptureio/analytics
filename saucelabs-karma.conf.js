module.exports = function(config) {
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
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],

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
});
