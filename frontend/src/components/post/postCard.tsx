import Link from "next/link";
import { Button, Card } from "antd";
import React from "react";

function PostCard({
  index,
  title,
  content,
}: {
  index: number;
  title: string;
  content: string;
}) {
  const postURL = `/post/${index}`;
  return (
    <Card
      type="inner"
      title={title}
      extra={<Link href={postURL}>More</Link>}
      style={{ marginBottom: 15 }}
    >
      {content.substring(0, 140)} {content.length > 140 && "..."}
    </Card>
  );
}

export default PostCard;
