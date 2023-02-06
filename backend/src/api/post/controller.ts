import Koa from 'koa';
import STATUS_CODE from '../../lib/statusCode';
import * as PostService from '../../service/post';

export const registerPost = async (ctx: Koa.DefaultContext) => {
  const { title, content } = ctx.request.body;
  const id = ctx.state.id;
  try {
    const post = await PostService.createPost({
      id,
      title,
      content,
    });
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: post,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getPostList = async (ctx: Koa.DefaultContext) => {
  const { limit, offset, pageable } = ctx.state.paginate;
  try {
    const result = await PostService.readPostList(offset, limit);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: result?.postList,
      _meta: pageable(result?.total),
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getMyPostList = async (ctx: Koa.DefaultContext) => {
  const id = ctx.state.id;
  const { limit, offset, pageable } = ctx.state.paginate;
  try {
    const result = await PostService.readMyPostList(id, offset, limit);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: result?.postList,
      _meta: pageable(result?.total),
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const getPostByIndex = async (ctx: Koa.DefaultContext) => {
  const { post_index } = ctx.params;
  try {
    const post = await PostService.readPostByIndex(post_index);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: post,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const patchPostContent = async (ctx: Koa.DefaultContext) => {
  const { post_index } = ctx.params;
  const { title, content } = ctx.request.body;
  const id = ctx.state.id;
  try {
    const post = await PostService.updatePostContent(
      post_index,
      id,
      title,
      content,
    );
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: post,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};

export const deletePost = async (ctx: Koa.DefaultContext) => {
  const { post_index } = ctx.params;
  const id = ctx.state.id;
  try {
    const post = await PostService.deletePost(post_index, id);
    ctx.body = {
      success: true,
      status: STATUS_CODE.SUCCESS,
      data: post,
    };
  } catch (err: any) {
    return ctx.throw(err.name, err.message);
  }
};
