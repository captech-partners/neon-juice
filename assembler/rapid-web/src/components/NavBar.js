import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export class NavigationBar extends Component {

  render() {
    return (
      <>
      <Navbar style={{ backgroundColor: "#0059b3", zIndex: "1" }}>
        <div className="mr-auto">
          <Navbar.Brand onClick={this.props.back} style={{ color: "white" }}>
            Rapid Website Creation Studio
          </Navbar.Brand>
        </div>
      </Navbar>
      </>
    );
  }
}
export default NavigationBar;
