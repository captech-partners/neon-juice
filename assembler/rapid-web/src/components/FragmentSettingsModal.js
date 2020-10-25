import React, { Component } from "react";
import { Modal, Col, Row, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import CodeEditor from "./CodeEditor";
import JointInput from "./JointInput";
import axios from "axios";


var str = null;
var count = 1;

class FragmentModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateHtml = this.updateHtml.bind(this);
    this.state = {
      html: props.html,
      joints: [],
      options: this.props.components.map((d) => ({ label: d.class_attr, value: d.class_attr, id: d.id})),
      step: 1,
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.html !== this.state.html) {
      this.setState({
        html: newProps.html
      })
    }
    if (!newProps.currentJoints.length){
      this.setState({
        joints: []
      })
    }else if(JSON.stringify(newProps.currentJoints) !== JSON.stringify(this.props.currentJoints)){
      var newJoints = []

      if(newProps.currentJoints.length && newProps.currentJoints !== this.state.joints){
        var defaultJoints = []
        newProps.currentJoints.forEach(joint => {
          defaultJoints = [];
          joint.map(d => defaultJoints.push({label: d, value: d}))
          var id = count;
          newJoints.push(<JointInput key={count++} defaultValue={defaultJoints} options={this.state.options} onDelete={() => this.deleteJoint(id)}/>)
        })
        this.setState({
          joints: newJoints
        })
      }
    }
  }

  addJoint = (value) => {
    var id = count;
    this.setState({
      joints: [...this.state.joints, <JointInput key={count++} defaultValue={value} options={this.state.options} onDelete={() => this.deleteJoint(id)}/>]
    })
  }

  deleteJoint = (id) => {
    const changedJoints = this.state.joints.filter(d => d.key !== id.toString())
    this.setState({
      joints: changedJoints
    })
  } 

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  updateHtml = (value) => (e) => {
    var update = e.target.value;
    str = this.props.html;

    var replaced;
    if (value === "name") {
      replaced = this.props.name;
      str = str.replace(replaced, update);
    }
    if (value === "labels") {
      replaced = this.props.labels;
      var i;
      var label_replacement = "";
      for (i = 0; i < replaced.length; i++) {
        if (i === replaced.length - 1) {
          label_replacement = label_replacement + replaced[i];
        } else {
          label_replacement = label_replacement + replaced[i] + ", ";
        }
      }

      str = str.replace(label_replacement, update);
    }
    if (value === "pages") {
      replaced = this.props.pages;
      var j;
      var replacement = "";
      for (j = 0; j < replaced.length; j++) {
        if (j === replaced.length - 1) {
          replacement = replacement + replaced[j];
        } else {
          replacement = replacement + replaced[j] + ", ";
        }
      }
      str = str.replace(replacement, update);
    }
    this.setState({
      html: str,
    });
  };

  handleChange = (value) => {
    this.props.onHtmlChange(value);
  };

  createFrag = () => {
    const url = `http://localhost:5000/fragments`;
    let data = JSON.stringify({
      html: this.state.html,
      file: this.props.name + ".html"
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(url, data, axiosConfig).then((result) => {
        console.log(result);
        this.props.updateList(this.props.id);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.toggleModal();
  };

  editFrag = () => {
    //add input validation for html
    const url = `http://localhost:5000/fragments/` + this.props.id;
    //change file to result.data.file_name
    let data = JSON.stringify({
      html: this.state.html,
      file: this.props.name + ".html"
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.put(url, data, axiosConfig).then((result) => {
        console.log(result);
        this.props.updateList(this.props.id);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.toggleModal();
  };

  render() {
    var optionsTemp = [];
    var selectedTemps = [];
    
    this.props.templateOptions.map((d) => optionsTemp.push({label: d.class_attr, value: d.class_attr}))
    this.props.temps.map((d) => selectedTemps.push({label: d, value: d}));

    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <Modal
            show={this.props.show}
            onHide={this.props.toggleModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
          >
            <Modal.Header style={{ border: "none" }}>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group as={Row}>
                <Form.Label column>Component Name</Form.Label>
                <Col>
                  <OverlayTrigger
                    overlay={<Tooltip>Name the component</Tooltip>}
                  >
                    <Form.Control
                      defaultValue={this.props.name}
                      onChange={this.updateHtml("name")}
                    />
                  </OverlayTrigger>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column>Descriptive Labels</Form.Label>
                <Col>
                  <Form.Control
                    defaultValue={this.props.labels}
                    onChange={this.updateHtml("labels")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column>Pages</Form.Label>
                <Col>
                  <Form.Control
                    defaultValue={this.props.pages}
                    onChange={this.updateHtml("pages")}
                  />
                </Col>
              </Form.Group>

              {this.props.id >= 0 ? (
                <Form.Group as={Row}>
                  <Form.Label column>Layouts</Form.Label>
                  <Col>
                    <Select isMulti defaultValue={selectedTemps} options={optionsTemp}/>
                  </Col>
                </Form.Group>
              ) : null}

                <h5>Add Nested Dynamic Content</h5>
                <div style={{marginLeft: "2em"}}>
                  <Form.Label>Choose Components</Form.Label>
                  {this.state.joints}
                  <br/>
                  <Button onClick={() => this.addJoint("")}>+ Add Another Component</Button>
                </div>
    
              <Button style={{ margin: "1em" }} onClick={this.nextStep}>
                Advanced Settings
              </Button>
            </Modal.Body>

            <Modal.Footer style={{ border: "none" }}>
              <Button variant="secondary" onClick={this.props.toggleModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={
                  this.props.title === "Edit Component" ||
                  this.props.title === "Edit Layout"
                    ? this.editFrag
                    : this.createFrag
                }
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        );
      case 2:
        return (
          <Modal
            show={this.props.show}
            onHide={this.props.toggleModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
          >
            <Modal.Header style={{ border: "none" }}>
              <Modal.Title>Advanced Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <CodeEditor
                outputText={str === null ? this.props.html : str}
                onHtmlChange={this.handleChange}
              />
            </Modal.Body>

            <Modal.Footer style={{ border: "none" }}>
              <Button variant="secondary" onClick={this.prevStep}>
                back
              </Button>
            </Modal.Footer>
          </Modal>
        );
      default:
        console.log("error has occured!");
    }
  }
}
export default FragmentModal;
