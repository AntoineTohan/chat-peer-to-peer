import React from "react";
import { Navbar } from "react-bootstrap";
import { Text } from "../text";

export class Header extends React.PureComponent {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {Text.header.title}
        </Navbar.Brand>
      </Navbar>
    );
  }
}
