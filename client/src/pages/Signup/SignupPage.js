import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SignupForm from "./SignupForm";
import Logo from "../../assets/imgs/logo.png";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registrationActions } from "../../_actions/registration.actions";

const SignupPage = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onClickSubmit = ({ fullName, email, password }) => {
    dispatch(
      registrationActions.register(
        fullName,
        email,
        password,
        password,
        navigate
      )
    );
  };

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
                  <SignupForm onSubmit={onClickSubmit} />
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
              <Col style={{ color: "#3BB0FD" }}>
                {" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>{" "}
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

export default connect(mapStateToProps)(SignupPage);
