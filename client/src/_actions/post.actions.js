import { postConstants } from "../_constants/post.constants";
import postService from "../_services/post.service";

const getPosts = () => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const posts = await postService.getPosts();
      dispatch(success(posts));
    } catch (error) {
      dispatch(failure(error));
    }
  };
  function request() {
    return { type: postConstants.GET_POSTS_REQUEST };
  }
  function success(posts) {
    return { type: postConstants.GET_POSTS_SUCCESS, payload: { posts } };
  }
  function failure(error) {
    return { type: postConstants.GET_POSTS_FAILURE, payload: { error } };
  }
};

const addPost = (post) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      dispatch(success(post));
    } catch (error) {
      dispatch(failure(error));
    }
  };
  function request() {
    return { type: postConstants.ADD_POST_REQUEST };
  }
  function success(post) {
    return { type: postConstants.ADD_POST_SUCCESS, payload: { post } };
  }
  function failure(error) {
    return { type: postConstants.ADD_POST_FAILURE, payload: { error } };
  }
};

export const postActions = {
  getPosts,
  addPost,
};
