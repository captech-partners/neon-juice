import React, { Component } from "react";
import { Navbar, NavDropdown, Form } from "react-bootstrap";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class NavigationBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }
  render() {
    return (
      <>
      <Navbar style={{ backgroundColor: "#0059b3", zIndex: "1" }}>
        <div className="mr-auto">
          <Navbar.Brand onClick={this.props.back} style={{ color: "white" }}>
            Rapid Website Creation Studio
          </Navbar.Brand>
        </div>

        <NavDropdown
          show={this.state.isOpen}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          rootCloseEvent={'click'}
          alignRight
          style={{ float: "right" , zIndex: "999"}}
          id="dropdown-basic"
          title={
            <FontAwesomeIcon
              icon={faCog}
              style={{ color: "#FFF", width: "auto", height: "3vh" }}
            />
          }
        >
          <Form>
            <Form.Check
              style={{ marginLeft: "1em", marginRight: "1em" }}
              type="switch"
              checked={this.props.tutorialEnabled}
              onChange={this.props.toggleTutorial}
              id="custom-switch"
              label="Enable Tutorial"
            />
          </Form>
        </NavDropdown>
      </Navbar>
      </>
    );
  }
}
export default NavigationBar;
