
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.useable\.css$/,
        use: [
          {
            loader: 'style-loader/useable'
          },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3333,
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}