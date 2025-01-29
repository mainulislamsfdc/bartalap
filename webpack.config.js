import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // Use DefinePlugin to inject environment variables
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'css', to: 'css' },
        { from: 'images', to: 'images' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}