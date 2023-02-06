import { GET, PATCH, POST, DELETE } from "../common";
import { IPost } from "./interface";

export const postPost = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const response = await POST("/post", {
    title,
    content,
  });
  if (response) {
    const post = {
      index: response.data?.index,
      writer: response.data?.writer,
      title: response.data?.title,
      content: response.data?.content,
      created_at: response.data?.created_at,
      updated_at: response.data?.updated_at,
    };
    return post;
  } else {
    return null;
  }
};

export const getPostList = async (page: number, limit: number) => {
  const response = await GET(`/post/list?page=${page}&limit=${limit}`);
  const postList: IPost[] = [];
  if (response) {
    response.data.forEach((post: any) => {
      postList.push({
        index: post.index,
        writer: post.writer,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
      });
    });
    const { total } = response._meta;
    return { postList: postList, total: total };
  } else {
    return null;
  }
};

export const getMyPostList = async (page: number, limit: number) => {
  const response = await GET(`/post/my_list?page=${page}&limit=${limit}`);
  const postList: IPost[] = [];
  if (response) {
    response.data.forEach((post: any) => {
      postList.push({
        index: post.index,
        writer: post.writer,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
      });
    });
    const { total } = response._meta;
    return { postList: postList, total: total };
  } else {
    return null;
  }
};

export const getPostByIndex = async (index: string) => {
  const response = await GET(`/post/${index}`);
  if (response) {
    const post: IPost = {
      index: response.data.index,
      writer: response.data.writer,
      title: response.data.title,
      content: response.data.content,
      profile_image_url: response.data.profile_image_url
        ? response.data.profile_image_url
        : "https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png",
      created_at: response.data.created_at,
      updated_at: response.data.updated_at,
    };
    return post;
  } else {
    return null;
  }
};

export const patchPost = async ({
  index,
  title,
  content,
}: {
  index: string;
  title: string;
  content: string;
}) => {
  const response = await PATCH(`/post/${index}`, { title, content });
  if (response) {
    const post: IPost = {
      index: response.data.index,
      writer: response.data.writer,
      title: response.data.title,
      content: response.data.content,
      created_at: response.data.created_at,
      updated_at: response.data.updated_at,
    };
    return post;
  } else {
    return null;
  }
};

export const deletePost = async (index: number) => {
  const response = await DELETE(`/post/${index}`);
  if (response) {
    return true;
  } else {
    return null;
  }
};
