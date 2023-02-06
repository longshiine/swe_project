import './config/envFilePath';

import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import helmet from 'koa-helmet';
import koaBody from 'koa-body';

import API from './api';
import errorControl from './middleware/errorControl';
import connectDB from './config/dbConnect';

// Koa
const app = new Koa();
const router = new Router();
const pagination = require('koa-pagination-v2');

// Middleware
app.use(helmet()); // Setting default HTTP headers
app.use(koaBody({ multipart: true })); // Parsing request body (like Multer)
app.use(pagination({ defaultLimit: 20, maximumLimit: 50 })); // Pagination

// Cors Setting
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.proxy = true;
app.use(cors(corsOptions));

// Connect DB
connectDB();

// Router
router.use('/api', errorControl, API.routes());
app.use(router.routes()).use(router.allowedMethods());

// Start Server
const { PORT } = process.env;
app.listen(PORT, (): void => {
  console.log(`[Koa] Koa server is listening on port ${PORT}`);
});
