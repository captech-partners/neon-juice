import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");

var str = "";
class CreateLayoutModal extends Component {
  constructor(props) {
    super(props);
    str = "";
    this.state = {
        show: props.show,
        name: "Layout-Default",
        id: props.id,
        labels: "default",
        pages: "homepage",
        html: "",
        url: "",
        font: "Arial, Helvetica, sans-serif",
        fontcolor: "#000000",
        backcolor: "#FFFFFF",
        type: "cover",
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.state.show){
      str = "";
      this.setState({
        name: "Layout-Default",
        show: newProps.show,
        id: newProps.id,
        labels: "default",
        pages: "homepage",
        html: "",
        url: "",
        font: "Arial, Helvetica, sans-serif",
        fontcolor: "#000000",
        backcolor: "#FFFFFF",
        type: "cover",
      });
    }
  }

  createTemplateStart = () => {
    var html =`<div class="initizalingTemplateComponent" data-label="start" data-page="${this.state.pages}" data-template="${this.state.name}"></div>`;
    var file_name = "initializingTempComponent.html";
    const url = `http://localhost:5000/fragments`;
    let data = JSON.stringify({
      html: html,
      file: file_name
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(url, data, axiosConfig).then((result) => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createFrag = () => {
    this.createTemplateStart();
    var size = this.state.type === "auto" ? "auto auto" : this.state.type;
    var html = `<html class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-id="${this.state.id}">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Starting Page</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
            <script defer="defer" src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"/>
            <style>
            ::-webkit-scrollbar {
                display: none;
            }
            html {
              width: 100%;
              height: 100%;
              background-color: ${this.state.backcolor};
              color: ${this.state.fontcolor};
              background-image: url("${this.state.url}");
              background-position: center;
              background-repeat: no-repeat;
              background-size: ${size};
            }
            </style>
        </head>
        <body style="font-family: ${this.state.font}">
            ${this.state.html}
        </body>
    </html>`
    const url = `http://localhost:5000/fragments`;
    let data = JSON.stringify({
      html: html,
      file: this.state.name + ".html",
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(url, data, axiosConfig)
      .then((result) => {
        this.props.updateList();
        this.props.onHide();
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  checkFont = (value) => {
    switch (value){
      case "sans-serif":
        this.setState({font: "Arial, Helvetica, sans-serif"})
        return;
      case "serif":
        this.setState({font: "Times New Roman, Times, serif"})
        return;
      default: 
        this.setState({font: "Lucida Console, Courier, monospace"})
        return;
    }

  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ border: "none", marginBottom: "0", paddingBottom: "0" }}
          closeButton
        >
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>Create New Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "40em" }}>
          <Tabs
            defaultTab="vertical-tab-one"
            vertical
            className="vertical-tabs"
            style={{height: "100%"}}
          >
            <TabList style={{ width: "20%", textAlign: "left" }}>
              <Tab tabFor="vertical-tab-one">General Settings</Tab>
              <Tab tabFor="vertical-tab-two">Content</Tab>
            </TabList>

            <TabPanel
              tabId="vertical-tab-one"
              style={{ height: "100%", width: "100%" }}
            >
              <div style={{ margin: "1em" }}>
                <h4>Description</h4>
                <p style={{marginBottom: "1em"}}>A layout is the base of the website and it describes the layout of the website. Here are <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer">resources</a> to help you if want to add code to your layout. </p>
                <h4>General Settings</h4>
                <div style={{padding: "1em", paddingTop: "1vh"}}>
                  <Form.Group as={Row}>
                    <Form.Label column>Layout Name</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Descriptive Labels</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.labels}
                        onChange={(e) => this.setState({labels: e.target.value})}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Pages</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.pages}
                        onChange={(e) => this.setState({pages: e.target.value})}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <h4>Styling Settings</h4>
                <div style={{padding: "1em", paddingTop: "1vh"}}>


                  <Form.Group as={Row}>
                    <Form.Label column md={"auto"}>
                      Background Image URL
                    </Form.Label>
                    <Col >
                      <Form.Control
                        defaultValue={this.state.url}
                        onChange={(e) =>
                          this.setState({ url: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={"auto"}>
                      <Form.Control as="select" defaultValue="cover" onChange={(e) => this.setState({type: e.target.value})}>
                        <option>cover</option>
                        <option>contain</option>
                        <option>auto</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Font</Form.Label>
                    <Col md="auto">
                      <Form.Control as="select" defaultValue="sans-serif" onChange={(e) => this.checkFont(e.target.value)}>
                        <option>sans-serif</option>
                        <option>monospace</option>
                        <option>serif</option>
                      </Form.Control>
                    </Col>
                    <Col>
                      <div style={{margin: "auto"}}>
                        <div dangerouslySetInnerHTML={{__html: `<p style="font-family: ${this.state.font}; color: ${this.state.fontcolor}; background-color: ${this.state.backcolor};font-size: 40px">Text</p>`}} />
                      </div>
                    </Col>
                  </Form.Group>
                    
                  <Form.Group as={Row}>
                    <Form.Label>Background Color</Form.Label>
                    <Col>
                      <input type="color" onChange={(e) => this.setState({backcolor: e.target.value})} value={this.state.backcolor}/>
                    </Col>
                  
                    <Form.Label>Font Color</Form.Label>
                    <Col>
                      <input type="color" onChange={(e) => this.setState({fontcolor: e.target.value})} value={this.state.fontcolor}/>
                    </Col>
                  </Form.Group>
                </div>
              </div>
            </TabPanel>

            <TabPanel
              tabId="vertical-tab-two"
              style={{ height: "100%", width: "100%" }}
            >
                <div class="container" style={{ margin: "1em" }}>
                    <h4>HTML Code</h4>
                    <div style={{ height: "30em", marginRight:"1em" }}>
                    <CodeMirror
                        value={str}
                        options={{
                            mode: "htmlmixed",
                            theme: "monokai",
                            lineNumbers: true,
                            lineWrapping: true,
                            autoRefresh: true,
                        }}
                        onChange={(editor, data, value) => {
                            this.setState({html: value})
                        }}
                        />
                    </div>
                </div>
            </TabPanel>
          </Tabs>
        </Modal.Body>

        <Modal.Footer style={{ border: "none" }}>
          <Button variant="primary" onClick={this.createFrag}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CreateLayoutModal;
