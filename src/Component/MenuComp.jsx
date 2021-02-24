import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  NavbarText,
  Col,
} from "reactstrap";
import { AuthContext } from "../App";

function MenuComp() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { state, dispatch } = useContext(AuthContext);
  return (
    <Navbar className="navbar-dark bg-dark mt-10" expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
          <Button color="default" onClick={() => dispatch({ type: "LOGOUT" })}>
            {state.isAuthenticated && <NavLink>LOGOUT</NavLink>}
          </Button>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
}

export default MenuComp;
