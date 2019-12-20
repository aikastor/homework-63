import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const Navigation = () => {
  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RouterNavLink} to="/">Blog</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/posts/new/">New Post</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/about/">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/contact/">Contact</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
  );
};

export default Navigation;