import { useLayoutEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { postActions } from "../../_actions/post.actions";
import Post from "../../_components/Post/Post";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import config from "../../_helpers/config";

const Home = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);

  useLayoutEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(config.apiUrl + "/postHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return localStorage
            .getItem("currentUserToken")
            .slice(1, localStorage.getItem("currentUserToken").length - 1);
        },
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection
          .invoke("getConnectionId")
          .then((connectionId) => {
            connection.invoke("sendConnectionId", connectionId);
          })
          .catch((err) => console.log(err));

        connection.on("SendNewPost", (newPost) => {
          dispatch(postActions.addPost(newPost));
        });
      })
      .catch((err) => {
        throw err;
      });

    dispatch(postActions.getPosts());
  }, [dispatch]);

  const listPosts = () => {
    if (!loading) {
      return posts.map((post) => {
        return (
          <div key={post.id}>
            <Post post={post} /> <br />
          </div>
        );
      });
    } else {
      return (
        <div>
          <Post /> <br />
          <Post /> <br />
          <Post /> <br />
          <Post /> <br />
          <Post /> <br />
        </div>
      );
    }
  };

  return listPosts();
};

function mapStateToProps(state) {
  return { posts: state.posts.posts, loading: state.posts.posts };
}

export default connect(mapStateToProps)(Home);
