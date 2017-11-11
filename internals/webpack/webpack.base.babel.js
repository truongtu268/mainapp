const path = require('path')
const webpack = require('webpack')

module.exports = (options) => {
  return ({
    entry: options.entry,
    output: Object.assign({
      path: path.resolve(process.cwd(), 'app/public'),
      publicPath: '/',
    }, options.output),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: options.cssLoaders,
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.(jpg|png|gif)$/i,
          exclude: /node_modules/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                gifsicle: {
                  interlaced: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          use: 'url-loader?limit=10000',
        },
      ],
    },
    plugins: options.plugins.concat([
      new webpack.ProvidePlugin({
        // make fetch available
        fetch: 'exports-loader?self.fetch!whatwg-fetch',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ]),
    resolve: {
      modules: ['node_modules', 'app'],
      alias: {
        moment$: 'moment/moment.js',
      },
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    resolveLoader: {
      modules: ['node_modules'],
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
    node: {
      fs: 'empty',
    },
  })
}
