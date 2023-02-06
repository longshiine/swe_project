import Koa from 'koa';
import Router from 'koa-router';

import authRouter from './auth';
import postRouter from './post';

const router = new Router();

router.use('/auth', authRouter.routes());
router.use('/post', postRouter.routes());

export default router;
