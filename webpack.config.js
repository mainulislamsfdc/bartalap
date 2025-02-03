import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get repository name from package.json for GitHub Pages
const pkg = JSON.parse(await import('fs').then(fs => fs.promises.readFile('./package.json', 'utf8')));
const repoName = pkg.name;

export default {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    publicPath: `/${repoName}/`,  // Updated for GitHub Pages
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
    new Dotenv({
      systemvars: true,
      safe: true
    }),
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'index.html',
          to: 'index.html',
          transform(content) {
            return content.toString()
              .replace(/src="\.\//g, `src="/${repoName}/`)
              .replace(/href="\.\//g, `href="/${repoName}/`);
          }
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
          from: 'manifest.json',
          to: 'manifest.json',
          transform(content) {
            return content.toString()
              .replace(/"\.\//g, `"/${repoName}/`);
          }
        },
        { 
          from: 'sw.js',
          to: 'sw.js',
          transform(content) {
            return content.toString()
              .replace(/'\.\//g, `'/${repoName}/`);
          }
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
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  mode: process.env.NODE_ENV || 'production'
}