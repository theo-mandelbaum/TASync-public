var webpack = require('webpack');

module.exports = {
    mode : (/hotfix\/|release\/|master/).test(process.env.githubSourceBranch) ? 'production' : 'development',
    entry: "./src/common/index.js",
    entry: { 'src/common/index.min': './src/common/index' },
    output: {
        path: __dirname + '/',
        filename: '[name].js',
        libraryTarget: 'this'
    },
   
}