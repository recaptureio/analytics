var webpack = require('webpack');
var path = require('path');
var version = require('./package').version;

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
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      side_effects: true,
			sequences: true,
      dead_code: true,
			drop_debugger: true,
			comparisons: true,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
			if_return: true,
			join_vars: true,
			cascade: true,
      drop_console: true,
      properties: true
    },
    output: {
      comments: false
    }
  }));
}

plugins.push(new webpack.BannerPlugin('Recapture.io v' + version + ' | MIT & BSD'));

module.exports = {
  entry: {
    ra: path.join(__dirname, 'src/index.js'),
    loader: path.join(__dirname, 'src/loader.js')
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? '[name].min.js' : '[name].js',
    libraryTarget: 'umd'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};
