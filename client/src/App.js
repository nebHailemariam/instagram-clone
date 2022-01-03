import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import AppNavbar from "./_components/AppNavbar/AppNavbar";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import PrivateRoute from "./_components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Row>
          <Col className="content-style" sm={6}>
            <Routes>
              <Route path="/" element={<PrivateRoute component={HomePage} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Routes>
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
