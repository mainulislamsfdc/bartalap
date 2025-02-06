import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log environment variables for debugging
console.log('Webpack build - Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API_KEY exists:', !!process.env.API_KEY);

export default {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    publicPath: '',
    clean: true
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    fallback: {
      "path": false,
      "fs": false
    }
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
    // Use only Dotenv plugin for environment variables
    new Dotenv({
      systemvars: true, // Load all system variables
      safe: true, // Load '.env.example' to verify the '.env' variables
      defaults: true, // Load '.env.defaults' as the default values
      debug: true // Show debug information
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'index.html',
          to: 'index.html'
        },
        { 
          from: 'css',
          to: 'css',
          noErrorOnMissing: true
        },
        { 
          from: 'images',
          to: 'images',
          noErrorOnMissing: true
        },
        { 
          from: 'favicon.ico',
          to: 'favicon.ico',
          noErrorOnMissing: true
        },
        { 
          from: 'manifest.json',
          to: 'manifest.json'
        },
        { 
          from: 'sw.js',
          to: 'sw.js'
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
    hot: true
  },
  mode: process.env.NODE_ENV || 'production'
}