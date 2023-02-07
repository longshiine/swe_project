import Koa from 'koa';
import Router from 'koa-router';

import authRouter from './auth';
import postRouter from './post';
import couponRouter from './coupon';

const router = new Router();

router.use('/auth', authRouter.routes());
router.use('/post', postRouter.routes());
router.use('/coupon', couponRouter.routes());

export default router;
