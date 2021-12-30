import { useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import logo from "../../assets/imgs/logo.png";
import {
  ChatQuote,
  CompassFill,
  Heart,
  HouseDoor,
  PersonCircle,
  PlusSquare,
  Search,
} from "react-bootstrap-icons";
import "./AppNavbar.css";

const LoggedInNavbar = () => {
  return (
    <div>
      <Navbar bg="white" expand="lg">
        <Container fluid style={{ padding: 0 }}>
          <Navbar className="nav-style">
            <Container>
              <Nav>
                <Container>
                  <Row>
                    <Col style={{ marginLeft: "10rem", marginRight: "11rem" }}>
                      <Navbar.Brand href="#home">
                        <img
                          src={logo}
                          width="110"
                          height="30"
                          className="d-inline-block align-top"
                          alt="React Bootstrap logo"
                        />
                      </Navbar.Brand>
                    </Col>
                    <Col sm="auto">
                      <Form>
                        <Search
                          style={{
                            marginLeft: "1rem",
                            marginTop: "0.8rem",
                            position: "absolute",
                          }}
                          className="light-font-color"
                        />
                        <FormControl
                          type="search"
                          placeholder="        Search"
                          className="me-2"
                          aria-label="Search"
                          className="light-background-color"
                        />
                      </Form>
                    </Col>
                    <Col sm="auto" style={{ marginLeft: "3rem" }}>
                      <Row>
                        <Col sm="auto">
                          <Nav.Item>
                            <HouseDoor className="icon-style" size="1.6rem" />
                          </Nav.Item>
                        </Col>
                        <Col sm="auto">
                          <Nav.Item>
                            <ChatQuote className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col sm="auto">
                          <Nav.Item>
                            <PlusSquare className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col sm="auto">
                          <Nav.Item>
                            <CompassFill className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col sm="auto">
                          <Nav.Item>
                            <Heart className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col sm="auto">
                          <Nav.Item>
                            <PersonCircle
                              className="icon-style"
                              size="1.6rem"
                            />
                          </Nav.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Nav>
            </Container>
          </Navbar>
        </Container>
      </Navbar>
    </div>
  );
};

const AppNavbar = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return <div>{isLoggedIn ? <></> : LoggedInNavbar()}</div>;
};

export default AppNavbar;
