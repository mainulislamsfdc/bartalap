const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './js/app.js', // Main entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production', // Use 'development' or 'production'
  plugins: [
    new Dotenv(), // Load environment variables from .env
  ],
};
