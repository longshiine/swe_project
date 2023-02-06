import React from "react";
import { useState, useEffect } from "react";
import { Layout, Pagination } from "antd";
import PostCard from "../components/post/postCard";
import { getPostList } from "../api/post/post";
import { IPost } from "../api/post/interface";

export default function Home() {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [page, setCurrentPage] = useState<number>(1);
  const [limit, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const readPostList = async (page: number, limit: number) => {
    const result = await getPostList(page, limit);
    if (result) {
      setPostList(result?.postList);
      setTotal(result?.total);
    }
  };

  useEffect(() => {
    readPostList(page, limit);
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
        {postList.length ? (
          postList.map((post: IPost) => {
            return (
              <PostCard
                index={post.index}
                title={post.title}
                content={post.content}
                key={post.index}
              />
            );
          })
        ) : (
          <div>게시글이 없습니다.</div>
        )}
        <br />
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
