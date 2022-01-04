import React from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import "./SignupPage.css";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.fullName) {
    errors.fullName = "Required";
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

let SignupForm = (props) => {
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
            name="fullName"
            type="text"
            component={renderField}
            label="Full Name"
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
                style={{ width: "100%", borderRadius: "0px" }}
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                style={{ width: "100%", borderRadius: "0px" }}
                disabled
              >
                Sign up
              </Button>
            </div>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>
    </Form>
  );
};
SignupForm = reduxForm({ form: "sing-upForm", validate })(SignupForm);

export default SignupForm;
