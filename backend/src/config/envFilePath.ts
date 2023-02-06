import path from 'path';
import dotenv from 'dotenv';

let envFilePath = '';
switch (process.env.NODE_ENV) {
  case 'local':
    envFilePath = `.env.local`;
    break;
  case 'development':
    envFilePath = `.env.development`;
    break;
  case 'production':
    envFilePath = `.env.production`;
    break;
  default:
    envFilePath = '';
}
dotenv.config({ path: path.join(__dirname, `./${envFilePath}`) });
