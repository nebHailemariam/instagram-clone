import { useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import logo from "../../assets/imgs/logo.png";
import {
  ArrowRepeat,
  Bookmark,
  ChatQuote,
  CompassFill,
  GearWide,
  Heart,
  HouseDoor,
  PersonCircle,
  PlusSquare,
  Search,
} from "react-bootstrap-icons";
import "./AppNavbar.css";
import { useState } from "react";

const LoggedInNavbar = () => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const ToggleProfileDropDown = () => {
    setShowProfileDropDown(!showProfileDropDown);
  };
  return (
    <div>
      <Navbar bg="white" expand="lg">
        <Container fluid style={{ padding: 0 }}>
          <Navbar className="nav-style">
            <Container>
              <Nav>
                <Container>
                  <Row>
                    <Col className="brand-style content-style">
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
                    <Col sm="auto" className="hide-content">
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
                          aria-label="Search"
                          className="light-background-color"
                        />
                      </Form>
                    </Col>
                    <Col sm="auto" className="icons-style">
                      <Row>
                        <Col>
                          <Nav.Item>
                            <HouseDoor className="icon-style" size="1.6rem" />
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <ChatQuote className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <PlusSquare className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <CompassFill className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <Heart className="icon-style" size="1.4rem" />
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <PersonCircle
                              className="icon-style"
                              size="1.6rem"
                              onClick={ToggleProfileDropDown}
                            />
                            <NavDropdown
                              show={showProfileDropDown}
                              autoClose="outside"
                              onToggle={(isOpen) => {
                                ToggleProfileDropDown();
                              }}
                            >
                              <NavDropdown.Item onClick={ToggleProfileDropDown}>
                                <PersonCircle className="icon-dropdown-style" />
                                Profile
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={ToggleProfileDropDown}>
                                <Bookmark className="icon-dropdown-style" />
                                Saved
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={ToggleProfileDropDown}>
                                <GearWide className="icon-dropdown-style" />
                                Settings
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={ToggleProfileDropDown}>
                                <ArrowRepeat className="icon-dropdown-style" />
                                Switch Account
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item onClick={ToggleProfileDropDown}>
                                Logout
                              </NavDropdown.Item>
                            </NavDropdown>
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

  return <div>{!isLoggedIn ? <></> : LoggedInNavbar()}</div>;
};

export default AppNavbar;
