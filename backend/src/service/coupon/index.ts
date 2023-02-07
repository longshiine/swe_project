import ERROR from '../../lib/error';
import STATUS_CODE from '../../lib/statusCode';

import { Coupon } from '../../model/coupon/index';
import { createCoupon, verifyCoupon } from '../../lib/jwt';
import { getCurrentDate } from '../../lib/util';
import { throwErrorMessage } from '../../lib/util';

interface ICoupon {
  code: string;
  campaign: string;
  index: number;
  points: number;
  used: boolean;
  created_at?: Date;
}
const coupon_list: ICoupon[] = [];

export const publishCoupon = async (
  campaign: string,
  points: string,
  index: number,
) => {
  const created_at = getCurrentDate();
  const code = await createCoupon(campaign, String(index), created_at);
  console.log(code);
  const coupon = new Coupon({
    code: code,
    campaign: campaign,
    index: index,
    points: Number(points),
    created_at: created_at,
  });
  await coupon.save();
  if (coupon) {
    return coupon;
  }
};

export const checkCouponByCode = async (code: string) => {
  const saved_coupon = await Coupon.findOne({ code });
  if (saved_coupon) {
    try {
      const received_coupon = await verifyCoupon(code);
      if (received_coupon && !saved_coupon.used) {
        // 쿠폰이 사용되지 않았다면
        return saved_coupon;
      } else {
        throwErrorMessage({
          // 이미 사용된 쿠폰
          statusCode: STATUS_CODE.NOT_FOUND,
          message: ERROR.NOT_VERIFIED_COUPON,
        });
      }
    } catch (e) {
      throwErrorMessage({
        // 사용기간 만료
        statusCode: STATUS_CODE.NOT_FOUND,
        message: ERROR.NOT_VERIFIED_COUPON,
      });
    }
  }
  throwErrorMessage({
    // 없는 쿠폰
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_READ_COUPON,
  });
};

export const readCouponList = async () => {
  const couponList = await Coupon.find().sort({ created_at: -1 });
  if (couponList) {
    return couponList;
  }
  return null;
};

export const updateCoupon = async (code: string) => {
  const coupon = await Coupon.findOne({ code });
  if (coupon) {
    coupon.used = true;
    await coupon.save();
    return coupon;
  }
  return null;
};
