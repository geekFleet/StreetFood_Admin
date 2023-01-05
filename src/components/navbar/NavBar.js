import "../navbar/Navbar.css";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AuthUser from "../authUser";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  let activeStyle = {
    color: "white",
  };
  return (
    <Navbar expand="lg">
      <Navbar.Brand id="navbar-logo">
        <img
          src="https://streetfood.blob.core.windows.net/asset/streetFoods.png"
          width="40"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{' '}
        StreetFoods
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <div className="navbtn">
            <NavLink
              id="navliDash"
              to={"dashboard"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Dashboard
            </NavLink>
            <NavLink
              id="navliDash"
              to={"user"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Users
            </NavLink>
            <NavLink
              id="navliDash"
              to={"vendor"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Vendors
            </NavLink>
          </div>
        </Nav>
        <Button id="navbarbtn" onClick={logoutUser}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
