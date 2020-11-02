import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import CodeEditor from "./CodeEditor";
import JointInput from "./JointInput";
import Toast from 'light-toast';
import axios from "axios";


var str = null;
var count = 1;

class FragmentModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateHtml = this.updateHtml.bind(this);
    this.state = {
      name: props.currentFragment.class_attr,
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: props.currentFragment.templates,
      html: props.currentFragment.html,
      file_name: props.currentFragment.file_name,
      joints: [],
      options: this.props.componentOptions.map((d) => ({ label: d.class_attr, value: d.class_attr, id: d.id})),
      step: 1,
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentFragment !== this.props.currentFragment) {
      this.setState({
        name: newProps.currentFragment.class_attr,
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: newProps.currentFragment.templates,
        html: newProps.currentFragment.html,
        file_name: newProps.currentFragment.file_name
      })
    }
    if(newProps.components !== this.props.components){
      this.setState({
        options: newProps.componentOptions.map((d) => ({ label: d.class_attr, value: d.class_attr, id: d.id}))
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
    str = this.state.html;

    var replaced;
    if (value === "name") {
      replaced = this.state.name;
      str = str.replace(replaced, update);
    }
    if (value === "labels") {
      replaced = this.state.labels;
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
      replaced = this.state.pages;
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
    this.setState({
      html: value,
    });
  };

  createFrag = () => {
    const url = `http://localhost:5000/fragments`;
    let data = JSON.stringify({
      html: this.state.html,
      file: this.state.name + ".html"
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(url, data, axiosConfig).then((result) => {
      console.log(result);
      this.props.updateList(this.state.id);
      this.props.toggleModal();
    })
    .catch(function (error) {
      Toast.fail('Invalid HTML. \nPlease check code editor for syntax errors.')
      console.log(error);
    });
  };

  editFrag = () => {
    const url = `http://localhost:5000/fragments/` + this.state.id;
    let data = JSON.stringify({
      html: this.state.html,
      file: this.state.file_name + ".html"
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.put(url, data, axiosConfig).then((result) => {
      console.log(result);
      this.props.updateList(this.state.id);
      this.props.toggleModal();
    })
    .catch(function (error) {
      Toast.fail('Invalid HTML. \nPlease check code editor for syntax errors.')
      console.log(error);
    });
  };

  render() {
    var optionsTemp = [];
    var selectedTemps = [];
    
    this.props.layoutOptions.map((d) => optionsTemp.push({label: d.class_attr, value: d.class_attr}))
    this.state.templates.map((d) => selectedTemps.push({label: d, value: d}));

    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <Modal
            show={this.props.show}
            onHide={this.props.toggleModal}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
          >
            <Modal.Header style={{ border: "none", margin: "0.5em", marginBottom: "0" }}>
              <Modal.Title as={'h3'}>{this.props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{marginLeft: "1em", marginRight: "1em"}}>
              <Form.Group as={Row}>
                <Form.Label column>Component Name</Form.Label>
                <Col>
                  <Form.Control
                    defaultValue={this.state.name}
                    onChange={this.updateHtml("name")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column>Descriptive Labels</Form.Label>
                <Col>
                  <Form.Control
                    defaultValue={this.state.labels}
                    onChange={this.updateHtml("labels")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column>Pages</Form.Label>
                <Col>
                  <Form.Control
                    defaultValue={this.state.pages}
                    onChange={this.updateHtml("pages")}
                  />
                </Col>
              </Form.Group>

              {this.state.id >= 0 ? (
                <Form.Group as={Row}>
                  <Form.Label column>Layouts</Form.Label>
                  <Col>
                    <Select isMulti defaultValue={selectedTemps} options={optionsTemp}/>
                  </Col>
                </Form.Group>
              ) : null}

              <h5>Add Nested Dynamic Content</h5>
              <div style={{marginLeft: "1em", marginRight: "0",marginBottom: "0", paddingBottom: "0"}}>
                <Form.Label>Choose Components</Form.Label>
                {this.state.joints}
                {!this.state.joints.length ? <br/> : null}
                <Button onClick={() => this.addJoint("")}>+ Add Another Component</Button>
              </div>
            </Modal.Body>

            <Modal.Footer style={{ border: "none" }}>
              <Button className="mr-auto" style={{marginTop: '1em'}} onClick={this.nextStep}>
                Advanced Settings
              </Button>
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
            backdrop="static"
            onHide={this.props.toggleModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
          >
            <Modal.Header style={{ border: "none" }}>
              <Modal.Title>Advanced Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{marginBottom: '0', paddingBottom: '0'}}>
              <CodeEditor
                outputText={str === null ? this.state.html : str}
                onHtmlChange={this.handleChange}
              />
            </Modal.Body>

            <Modal.Footer style={{ border: "none", paddingTop: '0', marginTop: '0'}}>
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
