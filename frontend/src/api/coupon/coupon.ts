import { GET, PATCH, POST, DELETE } from "../common";
import { ICoupon } from "./interface";

export const checkCouponByCode = async (coupon_code: string) => {
  const response = await POST("/coupon/check", {
    code: coupon_code,
  });
  if (response) {
    if (response.data === null) {
      return null;
    }
    const coupon = {
      code: response.data.code,
      points: response.data.points,
      used: response.data.used,
      created_at: response.data.created_at,
    };
    return coupon;
  } else {
    return null;
  }
};
