import { useLayoutEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { postActions } from "../../_actions/post.actions";
import Post from "../../_components/Post/Post";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import config from "../../_helpers/config";

const Home = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useLayoutEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(config.apiUrl + "/postHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        connection.on("ReceiveNewPost", (newPost) => {
          dispatch(postActions.addPost(newPost));
        });
      })
      .catch((err) => {
        throw err;
      });

    dispatch(postActions.getPosts());
  }, [dispatch]);

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
