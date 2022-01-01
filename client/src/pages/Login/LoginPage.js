import React from "react";
import { Col, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import Logo from "../../assets/imgs/logo.png";
import { Facebook } from "react-bootstrap-icons";

const LoginPage = () => {
  const submit = (values) => {
    console.log(values);
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
                  <LoginForm onSubmit={submit} />
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
          <div class="row" id="appSummary">
            <div class="col text-center">
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
              <Col style={{ color: "#3BB0FD" }}>Sign up</Col>
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

export default LoginPage;
