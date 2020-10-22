import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

//npm install jszip
var JSZip = require("jszip");
var zip = new JSZip();
const path = require("path");

export class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      show: props.show,
      toggleShow: props.toggle,
      tohome: false,
      value: "",
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.fileInput.current.files[0]);
    zip.loadAsync(this.fileInput.current.files[0]).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        if (path.extname(filename) === ".html") {
          console.log(filename);
        }
      });
    });
  }

  submit = () => {
    this.setState({ tohome: true });
  };

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    if (this.state.tohome === true) {
      this.props.page();
    }
    return (
      <Router>
        <Modal
          show={this.props.show}
          onHide={this.state.toggleShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form onSubmit={this.handleSubmit}>
            <Modal.Header style={{ border: "none" }}>
              <Modal.Title>Open Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input type="file" ref={this.fileInput} />
            </Modal.Body>

            <Modal.Footer style={{ border: "none" }}>
              <Button variant="secondary" onClick={this.state.toggleShow}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit" onClick={this.submit}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Router>
    );
  }
}
export default ProjectModal;
