var webpack = require('webpack');
var path = require('path');
var version = require('./package').version;
var uglifyConfig = require('./uglify');

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';
var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];

if (isProduction) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyConfig));
}

plugins.push(new webpack.BannerPlugin('Recapture.io analytics v' + version + ' | MIT & BSD'));

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? 'ra.min.js' : 'ra.js',
    library: 'ra'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};
