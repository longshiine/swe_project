import Koa from 'koa';
import Router from 'koa-router';

import * as postController from './controller';
import authenticateUser from '../../middleware/authenticate';

const router = new Router();

// POST Method
router.post('/', authenticateUser, postController.registerPost);

// GET Method
router.get('/list', postController.getPostList);
router.get('/my_list', authenticateUser, postController.getMyPostList);
router.get('/:post_index', postController.getPostByIndex);

// PATCH Method
router.patch('/:post_index', authenticateUser, postController.patchPostContent);

// DELETE Method
router.delete('/:post_index', authenticateUser, postController.deletePost);

export default router;
