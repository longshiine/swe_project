import Koa from 'koa';
import STATUS_CODE from '../../lib/statusCode';
import * as CouponService from '../../service/coupon';

export const registerCoupon = async (ctx: Koa.DefaultContext) => {
  const { campaign, points, num } = ctx.request.body;
  try {
    const coupon = await CouponService.publishCoupon(campaign, points, num);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: coupon,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const checkCoupon = async (ctx: Koa.DefaultContext) => {
  const { code } = ctx.request.body;
  try {
    const coupon = await CouponService.checkCouponByCode(code);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: coupon,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getCouponList = async (ctx: Koa.DefaultContext) => {
  try {
    const couponList = await CouponService.readCouponList();
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: couponList,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};
