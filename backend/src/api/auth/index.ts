import Koa from 'koa';
import Router from 'koa-router';

import * as AuthController from './controller';
import authenticateUser from '../../middleware/authenticate';
import uploadImage from '../../middleware/uploadImage';

const router = new Router();

// POST Method
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/get_token', AuthController.getToken);

// GET Method
router.get('/', authenticateUser, AuthController.getUser);
router.get('/list', AuthController.getUserList);
router.get('/id/:id', AuthController.getUserById);

// PATCH Method
router.patch('/', authenticateUser, AuthController.patchUser);
router.patch(
  '/profile_image',
  authenticateUser,
  (ctx, next) => uploadImage(ctx, next, `user/${ctx.state.id}`),
  AuthController.patchUserProfileImage,
);

// DELETE Method
router.delete('/', authenticateUser, AuthController.deleteUser);

export default router;
