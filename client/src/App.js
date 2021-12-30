import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import AppNavbar from "./_components/AppNavbar/AppNavbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <Row>
          <Col className="content-style" sm={6}>
            <Home />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
