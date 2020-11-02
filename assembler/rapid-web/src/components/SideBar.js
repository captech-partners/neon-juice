import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { faBars, faHeading, faImage, faStop, faIdCard, faCaretSquareDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            marginTop: "15em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faHeading}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faStop}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faImage}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faIdCard}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faCaretSquareDown}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
        <Button
            onClick={this.props.action}
          variant="outline-dark"
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
            marginBottom: "1em",
            width: "3em",
          }}
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "#FFF", width: "1em", height: "3vh" }}
          />
        </Button>
      </div>
    );
  }
}
export default SideBar;
