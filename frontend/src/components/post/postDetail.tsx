import React from "react";
import { Image, Card } from "antd";

function PostDetail({ post }: { post: any }) {
  return post ? (
    <Card title={post.title} style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: 10 }}>
          <Image
            width={70}
            height={70}
            src={post.writer?.profile_image_url}
            preview={false}
            alt="profile_image"
          />
        </div>
        <div>
          작성자: {post.writer?.name}
          <br />
          이메일: {post.writer?.email}
          <br />
          작성일: {String(post.created_at).slice(0, 10)}
        </div>
      </div>
      <br />
      {post.content}
    </Card>
  ) : (
    <div>없는 게시글 입니다.</div>
  );
}

export default PostDetail;
