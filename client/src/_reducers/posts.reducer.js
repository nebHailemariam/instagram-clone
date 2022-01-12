import { postConstants } from "../_constants/post.constants";

const initialPostsState = { posts: [] };

const posts = (state = initialPostsState, action) => {
  if (action.type === postConstants.GET_POSTS_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === postConstants.GET_POSTS_SUCCESS) {
    return { ...state, loading: false, posts: action.payload.posts };
  } else if (action.type === postConstants.GET_POSTS_FAILURE) {
    return { ...state, loading: false, error: action.payload.error };
  } else if (action.type === postConstants.ADD_POST_REQUEST) {
    return { ...state, loadingOnePost: true };
  } else if (action.type === postConstants.ADD_POST_SUCCESS) {
    return {
      ...state,
      loadingOnePost: false,
      posts: [action.payload.post, ...state.posts],
    };
  } else if (action.type === postConstants.ADD_POST_FAILURE) {
    return { ...state, loadingOnePost: false, error: action.payload.error };
  } else return state;
};

export default posts;
