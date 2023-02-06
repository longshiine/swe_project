import Koa from 'koa';
import ERROR from '../lib/error';
import { verifyToken } from '../lib/jwt';
import STATUS_CODE from '../lib/statusCode';

const authenticateUser = async (ctx: Koa.Context, next: any) => {
  const jwtToken = ctx.header.authorization as string;
  try {
    const { id } = await verifyToken(jwtToken);
    if (id) {
      ctx.state.id = id;
      return next();
    }
  } catch (e: any) {
    return ctx.throw(STATUS_CODE.UNAUTHORIZED, ERROR.UNAUTHORIZED_USER);
  }
};

export default authenticateUser;
