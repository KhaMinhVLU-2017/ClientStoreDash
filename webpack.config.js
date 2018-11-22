
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'app': './src/index.js',
  },
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
        test: /\.css$/ || /.\/src\/assert\/contents\/.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
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
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit: 8000, // Convert images < 8kb to base64 strings
            name: '/src/upload/images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: './src/assert/font/[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
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