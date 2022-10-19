import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function Heder() {
  const naviget = useNavigate();
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className=" sticky-top fixed-top"
      >
        <Container className="my-2">
          <Navbar.Brand as={NavLink} to={"/"}>
            MERN Stack Curd
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-3">
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/about"}>
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Button
            onClick={() => naviget("form")}
            size="lg"
            className="px-5"
            variant="outline-light"
          >
            Add User
          </Button>
        </Container>
      </Navbar>
    </>
  );
}
