import { GET, PATCH, POST, DELETE } from "../common";

export interface ICoupon {
  code: string;
  campaign: string;
  points: number;
  index: number;
  used: boolean;
}

export const generateCoupon = async ({
  campaign,
  points,
  num,
}: {
  campaign: string;
  points: string;
  num: number;
}) => {
  const response = await POST("/coupon", {
    campaign,
    points,
    num,
  });
  const couponList: ICoupon[] = [];
  if (response) {
    response.data.forEach((coupon: any) => {
      couponList.push({
        code: coupon.code,
        campaign: coupon.campaign,
        points: coupon.points,
        used: coupon.used,
        index: coupon.index,
      });
    });
    return couponList;
  } else {
    return null;
  }
};

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

export const getCouponList = async () => {
  const response = await GET("/coupon/list");
  const couponList: ICoupon[] = [];
  if (response) {
    response.data.forEach((coupon: any) => {
      couponList.push({
        code: coupon.code,
        campaign: coupon.campaign,
        points: coupon.points,
        index: coupon.index,
        used: coupon.used,
      });
    });
    return couponList;
  } else {
    return null;
  }
};
