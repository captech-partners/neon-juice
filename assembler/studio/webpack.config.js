var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: __dirname + '/app/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  output: {
    filename: 'websiteCreationStudio.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
