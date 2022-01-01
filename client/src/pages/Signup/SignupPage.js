import React from "react";
import { Col, Row } from "react-bootstrap";
import SignupForm from "./SignupForm";
import Logo from "../../assets/imgs/logo.png";

const SignupPage = () => {
  const submit = (values) => {};

  return (
    <div className="container">
      <Row className="justify-content-md-center">
        <Col className="sign-up-form-style" md={3}>
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
                  <SignupForm onSubmit={submit} />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col className="sign-up-form-bottom-style" md={3}>
          <br />
          <Col>
            <Row
              className="justify-content-md-center"
              style={{ fontSize: "95%" }}
            >
              <Col xs={3}></Col>
              Have an account?
              <Col style={{ color: "#3BB0FD" }}>Login </Col>
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

export default SignupPage;
