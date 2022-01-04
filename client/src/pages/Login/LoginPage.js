import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import Logo from "../../assets/imgs/logo.png";
import { Facebook } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import authenticationActions from "../../_actions/authentication.actions";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onClickSubmit = ({ email, password }) => {
    dispatch(authenticationActions.login(email, password, navigate));
  };

  return (
    <div className="container">
      <Row className="justify-content-md-center">
        <Col className="login-form-style" md={3}>
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <img
                src={Logo}
                alt="brand"
                style={{
                  maxWidth: "60%",
                  height: "auto",
                  paddingTop: "10%",
                  paddingBottom: "8%",
                }}
              />
            </Col>
            <Col style={{ paddingBottom: "10%" }}>
              <div>
                <div>
                  <LoginForm onSubmit={onClickSubmit} />
                </div>
              </div>
            </Col>

            <Col xs={12}>
              <Row>
                <Col md={1}></Col>
                <Col>
                  <Row className="justify-content-md-center">
                    <Col xs={5}>
                      <hr />
                    </Col>
                    <Col xs={2} style={{ fontSize: "75%", color: "gray" }}>
                      OR
                    </Col>
                    <Col xs={5}>
                      <hr />
                    </Col>
                  </Row>
                </Col>
                <Col md={1}></Col>
              </Row>
            </Col>
          </Row>

          <Col>
            <Row
              className="justify-content-md-center"
              style={{ fontSize: "95%" }}
            >
              <Col xs={2}></Col>
            </Row>
          </Col>
          <div className="row" id="appSummary">
            <div className="col text-center">
              <Facebook style={{ marginRight: "2%" }} />
              Login with Facebook
            </div>
          </div>
          <Col>
            <br />
          </Col>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="login-form-bottom-style" md={3}>
          <br />
          <Col>
            <Row
              className="justify-content-md-center"
              style={{ fontSize: "95%" }}
            >
              <Col xs={2}></Col>
              Don't have an account?
              <Col style={{ color: "#3BB0FD" }}>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </Col>
            </Row>
          </Col>
          <Col>
            <br />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return { isLoggedIn: state.authentication.isLoggedIn };
}

export default connect(mapStateToProps)(LoginPage);
