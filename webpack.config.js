const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify('object')
    })
  ]
};
