import path from 'path';
import Dotenv from 'dotenv-webpack';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './js/app.js',  // Ensure correct entry path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  plugins: [
    new Dotenv(), // Automatically loads environment variables from .env
  ],
};
