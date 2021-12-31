import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import AppNavbar from "./_components/AppNavbar/AppNavbar";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Row>
          <Col className="content-style" sm={6}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
