import React from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import "./LoginPage.css";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be greater than 7 characters";
  } else if (values.password.length > 25) {
    errors.password = "Password must be less than 25 characters";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <div>
      <FormControl {...input} placeholder={label} type={type} />
      {/* {touched && error && <span>{error}</span>} */}
    </div>
  </div>
);

let LoginFrom = (props) => {
  const { handleSubmit, valid } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={1}></Col>
        <Col>
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
            className="form-control"
          />
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col>
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
            className="form-control"
          />
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          {valid ? (
            <div>
              <Button
                className="btn-block"
                type="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                style={{ width: "100%", borderRadius: "0px" }}
                disabled
              >
                Login
              </Button>
            </div>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>
    </Form>
  );
};
LoginFrom = reduxForm({ form: "loginForm", validate })(LoginFrom);

export default LoginFrom;
