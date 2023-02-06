import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, Input, Button } from "antd";
import { patchPost } from "../../../api/post/post";
import { getPostByIndex } from "../../../api/post/post";

export default function EditPost() {
  const router = useRouter();
  const { index } = router.query;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const readPostByIndex = async () => {
    const result = await getPostByIndex(index as string);
    if (result) {
      setTitle(result.title);
      setContent(result.content);
    }
  };

  const updatePost = async () => {
    const result = await patchPost({
      index: index as string,
      title: title,
      content: content,
    });
    if (result) {
      alert("글이 수정되었습니다.");
      router.push("/mypage");
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
        <Input
          showCount
          maxLength={20}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="제목을 입력해 주세요"
        />
        <br />
        <br />
        <Input.TextArea
          showCount
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          style={{ height: 120, marginBottom: 24 }}
          placeholder="내용을 입력해 주세요"
        />
        <Button onClick={() => updatePost()}>수정하기</Button>
      </Layout.Content>
    </Layout>
  );
}
