import React from "react";
import { useState, useEffect } from "react";
import { Layout, Pagination } from "antd";
import PostCard from "../../components/post/postCard";
import { getCouponList, ICoupon } from "../../api/coupon/coupon";
import { IPost } from "../../api/post/interface";

export default function Home() {
  const [couponList, setCouponList] = useState<ICoupon[]>([]);

  const readCouponList = async () => {
    const result = await getCouponList();
    if (result) {
      setCouponList(result);
    }
  };

  useEffect(() => {
    readCouponList();
  }, []);

  return (
    <Layout>
      <Layout.Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: "white",
        }}
      >
        {couponList.length ? (
          <table>
            {couponList.map((coupon: ICoupon) => {
              return (
                <li key={coupon.index}>
                  <ol>campaign: {coupon.campaign}</ol>
                  <ol>code: {coupon.code}</ol>
                  <ol>points: {coupon.points}</ol>
                  <ol>index: {coupon.index}</ol>
                  <ol>used: {coupon.used}</ol>
                </li>
              );
            })}
          </table>
        ) : (
          <div>쿠폰이 없습니다.</div>
        )}
      </Layout.Content>
    </Layout>
  );
}
