import React, { Component } from "react";
import { Navbar, NavDropdown, Form } from "react-bootstrap";
import FragmentList from "./FragmentLists";
import PageViewer from "./PageViewer";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTemplate: "StartPage",
      viewPages: ["newpage"],
      viewLabels: ["default"],
      currentPage: "newpage",
      currentLabel: "default",
      default: [{label: "default", value: "default"}],
      tutorialEnabled: false
    };
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  updateTemplate = (temp) => {
    var name = temp.class_attr ? temp.class_attr : this.state.viewTemplate;
    var pages = temp.pages ? temp.pages : this.state.viewPages;
    var labels = temp.labels ? temp.labels : this.state.viewLabels;
    this.setState({
      viewTemplate: name,
      viewPages: pages,
      viewLabels: labels,
      currentPage: pages[0],
      currentLabel: labels[0],
      default: [{label: labels[0], value: labels[0]}]
    })
  }

  render() {
    var updateTemplate = this.updateTemplate.bind(this);
    return (
      <div className="SecondPage">
        <Navbar style={{ backgroundColor: "#0059b3" }}>
          <div className="mr-auto">
            <Navbar.Brand onClick={this.back} style={{ color: "white" }}>
              Rapid Website Creation Studio
            </Navbar.Brand>
          </div>
          
          <NavDropdown
            alignRight
            style={{ float: "right" }}
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
                checked={this.state.tutorialEnabled}
                onChange={() => this.setState({tutorialEnabled: !this.state.tutorialEnabled})}
                id="custom-switch"
                label="Enable Tutorial"
              />
            </Form>
          </NavDropdown>
        </Navbar>

        <div style={{ display: "flex" }}>
          <FragmentList
            updateTemplate={updateTemplate.bind(this)}
            tutorialEnabled={this.state.tutorialEnabled}
          />

          <PageViewer
            url={"http://localhost:5000/newpage?label=default"}
            templateName={this.state.viewTemplate}
            currentPage={this.state.currentPage}
            currentLabel={this.state.currentLabel}
            pages={this.state.viewPages}
            labels={this.state.viewLabels}
            default={this.state.default}
            tutorialEnabled={this.state.tutorialEnabled}
          />
        </div>
      </div>
    );
  }
}
export default SecondPage;
