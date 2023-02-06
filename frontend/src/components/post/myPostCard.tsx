import React from "react";
import { useRouter } from "next/router";

import { Button, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { IPost } from "../../api/post/interface";
import { deletePost } from "../../api/post/post";

function MyPostCard({ post }: { post: IPost }) {
  const router = useRouter();
  const removePost = async (post: IPost) => {
    const result = await deletePost(post.index);
    if (result) {
      alert("글이 삭제되었습니다.");
      router.reload();
    }
  };
  return (
    <Card
      title={post.title}
      style={{ marginBottom: 15 }}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => router.push(`/post/edit/${post.index}`)}
        />,
        <DeleteOutlined key="delete" onClick={() => removePost(post)} />,
      ]}
    >
      {post.content}
    </Card>
  );
}

export default MyPostCard;
