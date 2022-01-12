import { useLayoutEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { postActions } from "../../_actions/post.actions";
import Post from "../../_components/Post/Post";

const Home = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useLayoutEffect(() => {
    dispatch(postActions.getPosts());
  }, [dispatch]);
  console.log(posts);

  const listPosts = posts.map((post) => {
    return (
      <div key={post.id}>
        <Post post={post} /> <br />
      </div>
    );
  });

  return listPosts;
};

function mapStateToProps(state) {
  return { posts: state.posts.posts };
}

export default connect(mapStateToProps)(Home);
