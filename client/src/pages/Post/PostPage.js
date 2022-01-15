import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postActions } from "../../_actions/post.actions";
import Post from "../../_components/Post/Post";

const PostPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((post) => {
    if (post.id === id) return post;
    return null;
  });

  useEffect(() => {
    dispatch(postActions.getPosts());
  }, [dispatch]);

  return { post } ? <Post post={post}></Post> : <Post></Post>;
};

const mapStateToProps = (state) => {
  return { posts: state.posts.posts };
};

export default connect(mapStateToProps)(PostPage);
