import "./Post.css";
import { Card, Col, Row } from "react-bootstrap";
import {
  Bookmark,
  Chat,
  Heart,
  HeartFill,
  PersonCircle,
  Share,
} from "react-bootstrap-icons";
import { ThreeDots } from "react-bootstrap-icons";

const Post = (props) => {
  return (
    <Card>
      <Card.Header style={{ background: "#ffffff" }}>
        <Row>
          <Col>
            {props.profilePicture ? (
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
            &nbsp; &nbsp; Avocado
          </Col>
          <Col sm={1} xs={2}>
            <ThreeDots />
          </Col>
        </Row>
      </Card.Header>

      <Card.Img src="https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/5f9c9b00740569d1a4ca291b.jpg" />
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
