import "./Post.css";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import {
  Bookmark,
  Chat,
  Heart,
  HeartFill,
  PersonCircle,
  Share,
} from "react-bootstrap-icons";
import { ThreeDots } from "react-bootstrap-icons";
import { useState } from "react";

const Post = (props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card>
      <Card.Header style={{ background: "#ffffff" }}>
        <Row>
          <Col>
            {!props.profilePicture ? (
              <PersonCircle size="2rem" />
            ) : (
              <img
                className="rounded-circle"
                width="30rem"
                height="30rem"
                src="https://techstacker.com/static/d695fe69198cc4558284e9aec1a4892c/4148e/react.png"
                alt="post"
              ></img>
            )}
            &nbsp; &nbsp;
            {props.post ? (
              <span>{`${props.post?.applicationUser.firstName} ${props.post?.applicationUser.lastName}`}</span>
            ) : (
              <div></div>
            )}
          </Col>
          <Col sm={1} xs={2}>
            <ThreeDots />
          </Col>
        </Row>
      </Card.Header>
      {loaded ? null : (
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={12} style={{ paddingBottom: "75%" }} />
        </Placeholder>
      )}
      <Card.Img
        src={props.post?.fileUrl}
        style={loaded ? {} : { display: "none" }}
        onLoad={() => setLoaded(true)}
      />
      <Card.Body>
        <Row>
          <Col>
            {!props.liked ? (
              <Heart size="1.3rem" />
            ) : (
              <HeartFill size="1.3rem" style={{ color: "#FA0D50" }} />
            )}

            <Chat
              size="1.4rem"
              style={{ marginTop: "-0.25rem", marginLeft: "1.3rem" }}
            />
            <Share
              size="1.4rem"
              style={{ marginTop: "-0.25rem", marginLeft: "1.3rem" }}
            />
          </Col>
          <Col xs={2} md={1}>
            <Bookmark size="1.3rem" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
