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
// router.get('/:post_index', postController.getPostByIndex);

// PATCH Method
// router.patch('/:post_index', authenticateUser, postController.patchPostContent);

// DELETE Method
// router.delete('/:post_index', authenticateUser, postController.deletePost);

export default router;
