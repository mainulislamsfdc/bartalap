import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'docs'), // Changed from 'dist' to 'docs'
    filename: 'bundle.js',
    publicPath: './' // This ensures assets are loaded correctly on GitHub Pages
  },
  mode: 'production',
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    }),
  ],
}