import ERROR from '../../lib/error';
import STATUS_CODE from '../../lib/statusCode';

import * as AuthService from '../auth';
import { Post } from '../../model/post/index';
import { throwErrorMessage } from '../../lib/util';
import { Increment } from 'mongoose-auto-increment-ts';

interface IPost {
  id: string;
  title: string;
  content: string;
}

export const createPost = async ({ id, title, content }: IPost) => {
  const writer = await AuthService.readUserInfo(id);
  const index = await Increment('Post');
  const post = new Post({
    index,
    writer: writer?._id,
    title,
    content,
  });
  await post.save();

  if (post) {
    return post.populate(populateWriterOptions);
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.SERVER_ERROR,
    message: ERROR.NOT_CREATE_POST,
  });
};

export const readPostList = async (offset: number, limit: number) => {
  const total = await Post.countDocuments();
  const postList = await Post.find()
    .sort({ created_at: -1 })
    .skip(offset)
    .limit(limit)
    .populate({ ...populateWriterOptions });
  if (postList) {
    return { postList: postList, total: total };
  }
  return null;
};

export const readMyPostList = async (
  id: string,
  offset: number,
  limit: number,
) => {
  const user = await AuthService.readUserInfo(id);
  const total = await Post.countDocuments({ writer: user?._id });
  const postList = await Post.find({
    writer: user?._id,
  })
    .sort({ created_at: -1 })
    .skip(offset)
    .limit(limit)
    .populate({ ...populateWriterOptions });
  if (postList) {
    return { postList: postList, total: total };
  }
  return null;
};

export const readPostByIndex = async (post_index: number) => {
  const post = await Post.findOne({ index: post_index }).populate({
    ...populateWriterOptions,
  });
  if (post) {
    return post;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_READ_POST,
  });
};

export const updatePostContent = async (
  post_index: number,
  id: string,
  title: string,
  content: string,
) => {
  const post = await Post.findOne({ index: post_index }).populate({
    ...populateWriterOptions,
  });
  if (post) {
    if (post.writer.id !== id) {
      throwErrorMessage({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: ERROR.NOT_UPDATE_POST,
      });
    }
    post.title = title;
    post.content = content;
    let new_post = await Post.findOne({
      index: post_index,
    }).populate(populateWriterOptions);
    return new_post;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_UPDATE_POST,
  });
};

export const deletePost = async (post_index: number, id: string) => {
  const post = await Post.findOne({ index: post_index }).populate({
    ...populateWriterOptions,
  });
  if (post) {
    if (post.writer.id !== id) {
      throwErrorMessage({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: ERROR.NOT_DELETE_POST,
      });
    }
    await post.deleteOne();
    return true;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_DELETE_POST,
  });
};

const populateWriterOptions = {
  path: 'writer',
  select: {
    _id: 1,
    id: 1,
    name: 1,
    email: 1,
    gender: 1,
    profile_image_url: 1,
  },
  options: {
    sort: { created_at: 1 },
  },
};
