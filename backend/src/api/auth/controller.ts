import Koa from 'koa';
import STATUS_CODE from '../../lib/statusCode';
import * as AuthService from '../../service/auth';
import { createToken } from '../../lib/jwt';

export const getToken = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.request.body;
  try {
    const jwtToken = await createToken(id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: { token: jwtToken },
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const signup = async (ctx: Koa.DefaultContext) => {
  const { id, password, name, gender, email } = ctx.request.body;
  try {
    const alreadyExistUser = await AuthService.findRedundantID(id);
    if (alreadyExistUser) {
      ctx.body = {
        success: true,
        status: STATUS_CODE.SUCCESS,
        data: null,
      };
      return;
    }
    const user = await AuthService.createUser({
      id,
      password,
      name,
      gender,
      email,
    });
    const jwtToken = await createToken(user.id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: { user, token: jwtToken },
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const login = async (ctx: Koa.DefaultContext) => {
  const { id, password } = ctx.request.body;

  try {
    const user = await AuthService.readUserInfo(id);
    if (password === user?.password) {
      let jwtToken = '';
      if (user) {
        jwtToken = await createToken(user.id);
      }
      ctx.body = {
        success: true,
        status: STATUS_CODE.SUCCESS,
        data: { user, token: jwtToken },
      };
    } else {
      ctx.body = {
        success: true,
        status: STATUS_CODE.SUCCESS,
        data: null,
      };
    }
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getUser = async (ctx: Koa.DefaultContext) => {
  const id = ctx.state.id;
  try {
    const user = await AuthService.readUserInfo(id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: user,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getUserList = async (ctx: Koa.DefaultContext) => {
  try {
    const userList = await AuthService.readUserList();
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: userList,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getUserById = async (ctx: Koa.DefaultContext) => {
  const { id } = ctx.params;
  try {
    const user = await AuthService.readUserInfo(id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: user,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const patchUser = async (ctx: Koa.DefaultContext) => {
  const id = ctx.state.id;
  const bodyData = ctx.request.body;
  try {
    const user = await AuthService.updateUserInfo({ id, ...bodyData });
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: user,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const patchUserProfileImage = async (ctx: Koa.DefaultContext) => {
  const id = ctx.state.id;
  const s3Data = ctx.body;
  try {
    const user = await AuthService.updateUserProfileImage(id, s3Data.img_src);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: user,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const deleteUser = async (ctx: Koa.DefaultContext) => {
  const id = ctx.state.id;
  try {
    await AuthService.deleteUserInfo(id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: null,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};
