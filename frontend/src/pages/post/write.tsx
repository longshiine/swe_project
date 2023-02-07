import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, Input, Button } from "antd";
import { postPost } from "../../api/post/post";

export default function Post() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const writePost = async () => {
    const result = await postPost({
      title: title,
      content: content,
    });
    if (result) {
      alert("글이 작성되었습니다.");
      router.push("/mypage");
    } else {
      alert("글 작성에 실패하였습니다. (포인트 부족)");
      return;
    }
  };

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
          placeholder="제목을 입력해 주세요"
        />
        <br />
        <br />
        <Input.TextArea
          showCount
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: 120, marginBottom: 24 }}
          placeholder="내용을 입력해 주세요"
        />
        <Button onClick={() => writePost()}>작성하기</Button>
      </Layout.Content>
    </Layout>
  );
}
