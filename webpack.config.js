const webpack = require('webpack')
const path = require('path')

const baseline = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './server/static/build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: []
          }
        }
      }
    ]
  }
}

const development = {
  ...baseline,
  watch: true
}

const production = {
  ...baseline,
  plugins: [new webpack.optimize.UglifyJsPlugin()]
}

const config = process.env.NODE_ENV === 'production' ? production : development

module.exports = config
