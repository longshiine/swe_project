import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, Pagination, Card, Image, Button, Spin } from "antd";
import type { UploadProps } from "antd";
import { PictureOutlined } from "@ant-design/icons";

import MyPostCard from "../components/post/myPostCard";
import { IUser } from "../api/auth/interface";
import { IPost } from "../api/post/interface";
import { getMyPostList } from "../api/post/post";
import { getUser, patchUserProfileImage, deleteUser } from "../api/auth/auth";
import { removeUserInfoFromLocalStorage } from "../lib/localStorage";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [profileImage, setProfileImage] = useState<string>("");
  const [postList, setPostList] = useState<IPost[]>([]);
  const [page, setCurrentPage] = useState<number>(1);
  const [limit, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const readMyInfo = async () => {
    const result = await getUser();
    if (result) {
      setUser(result);
      setProfileImage(result.profile_image_url);
    }
  };

  const readMyPostList = async (page: number, limit: number) => {
    const result = await getMyPostList(page, limit);
    if (result) {
      setPostList(result?.postList);
      setTotal(result?.total);
    }
  };

  const withDraw = async () => {
    const confirm = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirm) {
      return;
    }
    const result = await deleteUser();
    if (result) {
      removeUserInfoFromLocalStorage();
      alert("탈퇴되었습니다.");
      router.push("/");
    }
  };

  const updateUserProfileImage = async (e: any) => {
    const formData: any = new FormData();
    formData.append("profile_image", e.target.files[0]);
    setLoading(true);
    const result = await patchUserProfileImage(formData);
    if (result) {
      setProfileImage(result.profile_image_url);
      alert("프로필 사진이 변경되었습니다.");
      setLoading(false);
      router.reload();
    }
  };

  useEffect(() => {
    readMyInfo();
  }, []);

  useEffect(() => {
    readMyPostList(page, limit);
  }, [page, limit]);

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
        <h2 style={{ fontWeight: "bold", margin: 20 }}>회원 정보</h2>
        <Card
          title={user?.id}
          extra={
            <span>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => router.push("/auth/edit")}
              >
                수정
              </Button>
              <Button danger onClick={() => withDraw()}>
                탈퇴
              </Button>
            </span>
          }
          style={{ width: 300 }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ position: "relative" }}>
              <Image
                width={200}
                height={200}
                src={profileImage}
                preview={false}
                alt="profile_image"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 155,
                color: "white",
                fontSize: 25,
              }}
            >
              {loading ? <Spin /> : <PictureOutlined />}
            </div>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={updateUserProfileImage}
              style={{
                position: "absolute",
                height: 200,
                opacity: 0,
              }}
            />
          </div>
          <p>이름: {user?.name}</p>
          <p>성별: {user?.gender}</p>
          <p>메일: {user?.email}</p>
        </Card>
        <h2 style={{ fontWeight: "bold", margin: 20, marginTop: 40 }}>
          게시물 관리
        </h2>
        {postList.length ? (
          postList.map((post: IPost) => {
            return <MyPostCard post={post} key={post.index} />;
          })
        ) : (
          <div>게시글이 없습니다.</div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }}
          />
        </div>
      </Layout.Content>
    </Layout>
  );
}
