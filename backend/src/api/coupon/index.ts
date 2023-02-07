import Koa from 'koa';
import Router from 'koa-router';

import * as couponController from './controller';
import authenticateUser from '../../middleware/authenticate';

const router = new Router();

// POST Method
router.post('/', couponController.registerCoupon);
router.post('/check', couponController.checkCoupon);

// GET Method
router.get('/list', couponController.getCouponList);

export default router;
