import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PostDetail from "../../components/post/postDetail";
import { Layout } from "antd";
import { getPostByIndex } from "../../api/post/post";
import { IPost } from "../../api/post/interface";

export default function Post() {
  const router = useRouter();
  const { index } = router.query;
  const [post, setPost] = useState<IPost>();

  const readPostByIndex = async () => {
    const result = await getPostByIndex(index as string);
    if (result) {
      setPost(result);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    readPostByIndex();
  }, [router.isReady]);

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
        <PostDetail post={post} />
      </Layout.Content>
    </Layout>
  );
}
