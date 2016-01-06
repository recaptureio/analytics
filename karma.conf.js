module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    autoWatch: true,

    singleRun: false,

    frameworks: ['mocha', 'chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    reporters: ['spec'],

    colors: true,

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
