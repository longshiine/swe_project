import Koa from 'koa';
import { Context } from 'koa';

interface IResponse {
  success: boolean;
  status: number;
  message: string;
}

const errorControl = async function (ctx: Koa.Context, next: any) {
  try {
    const { method, url, header } = ctx.request;
    return await next();
  } catch (err: any) {
    const { method, url, header } = ctx.request;
    ctx.status = parseInt(err.status, 10) || ctx.status;
    const response = <IResponse>{
      success: false,
      status: ctx.status,
    };
    switch (ctx.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500: {
        response.message = err.message;
        break;
      }
      default: {
        response.message = '<Unknown error>  ' + err;
      }
    }
    console.log('----------------------------------------------------');
    console.log(method, url);
    console.log(err);
    console.log('----------------------------------------------------');
    ctx.body = response;
  }
};

export default errorControl;
