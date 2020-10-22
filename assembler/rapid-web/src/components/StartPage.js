import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ProjectModal from "./ProjectModal";

export class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  continue = (e) => {
    this.props.nextStep();
  };

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className="StartPage">
        <h1 id="StartPage">Rapid Website Creation Studio</h1>
        <div className="StartButtons">
          <Button
            variant="secondary"
            style={{ margin: "5em", marginLeft: "0" }}
            onClick={this.continue}
          >
            New Project
          </Button>
          <Button variant="secondary" onClick={this.toggleShow}>
            Import Project
          </Button>
          <ProjectModal
            show={this.state.show}
            toggle={this.toggleShow}
            page={this.continue}
          />
        </div>
      </div>
    );
  }
}
export default StartPage;
