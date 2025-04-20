const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname + "/",
  entry: { "src/index.min": ["./src/index"] },
  output: {
    path: __dirname + "/",
    filename: "[name].js",
    libraryTarget: "this"
  },
  mode: 'production', // Webpack 5 optimizes the build automatically in production mode
  optimization: {
    minimize: true, // Ensure minimization is enabled
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments
          },
          compress: {
            unused: true,
            dead_code: true, // Strip code that will never execute
            warnings: false, // Good for prod apps so users can't peek behind curtain
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true, // Strips console statements
            sequences: true,
            booleans: true
          },
        },
        extractComments: false, // Do not extract comments to a separate file
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
