import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "../../App.scss";
import Select from "react-select";
import axios from "axios";


class ButtonModal extends Component {
  constructor(props) {
    super(props);
    var templates = this.props.currentFragment.id < 0 ? [this.props.currentFragment.class_attr] : this.props.currentFragment.templates
    this.state = {
      name: "new-button",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      text: "Button",
      size: "",
      fontcolor: "#000000",
      backcolor: "#FFFFFF",
      isRound: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment && (newProps.currentFragment.id < 0 && !this.props.layoutOptions.includes(newProps.currentFragment.class_attr))) {
      var templates = newProps.currentFragment.id < 0 ? [newProps.currentFragment.class_attr] : newProps.currentFragment.templates
      this.setState({
        name: "new-button",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        text: "Button",
        size: "",
        fontcolor: "#000000",
        backcolor: "#FFFFFF",
        isRound: false
      });
    }
  }

  createFrag = () => {
    this.addToLayouts();
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${this.state.templates}" data-id="${this.state.id}">\n<button class="button ${this.state.size} ${this.state.isRound ? "is-rounded" : ""}" style="background-color: ${this.state.backcolor}; color: ${this.state.fontcolor}">${this.state.text}</button>\n</div>`
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
        console.log(result);
        this.props.hideModal();
        this.props.updateList();
        this.props.refresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addToLayouts = () => {
    var str = `<div class="content" data-child-limit="1" data-child-type="${this.state.name}"></div>\n`
    this.props.layoutOptions.forEach(layout => {
      if (this.state.templates.includes(layout.class_attr)){
        var html = layout.html;
        var index = html.lastIndexOf(`</body>`);
        html = html.substring(0, index) + str + html.substring(index);
        this.quickChange(layout.id, html, layout.file_name)
      }
    })
  }

  quickChange = (id, html, filename) => {
    const url = `http://localhost:5000/fragments/` + id;
    let data = JSON.stringify({
      html: html,
      file: filename + ".html",
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(url, data, axiosConfig)
      .then((result) => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  checkSize = (size) =>{
    switch(size){
        case "Small":
            return "is-small";
        case "Normal":
            return "is-normal";
        case "Medium":
            return "is-medium";
        case "Large":
            return "is-large";
        default:
            return "";
    }
  }

  changeLabels = (value) => {
      var newList = value ? value.map(d => d.value).join() : []
      this.setState({
          labelValue: newList
      })
  }

  render() {
    var optionsTemp = [];
    var selectedTemps = [];

    this.props.layoutOptions.map((d) =>
      optionsTemp.push({ label: d.class_attr, value: d.class_attr })
    );
    this.state.templates.map((d) => selectedTemps.push({ label: d, value: d }));

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.hideModal}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ border: "none", marginBottom: "0", paddingBottom: "0" }}
          closeButton
        >
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>Create a Button Component</Modal.Title>
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
                <h4>General Settings</h4>
                <div style={{padding: "1em", paddingTop: "1vh"}}>
                <Form.Group as={Row}>
                  <Form.Label column>Component Name</Form.Label>
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
                <Form.Group as={Row}>
                  <Form.Label column>Layouts</Form.Label>
                  <Col>
                    <Select
                      isMulti
                      isClearable={false}
                      defaultValue={selectedTemps}
                      onChange={(e) => this.changeLabels(e)}
                      options={optionsTemp}
                    />
                  </Col>
                </Form.Group>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              tabId="vertical-tab-two"
              style={{ height: "100%", width: "100%" }}
            >
                <div style={{ margin: "1em" }}>
                    <h4>Button Content</h4>
                    <div style={{padding: "1em", paddingTop: "1vh", display: "flex"}}>
                        <div>
                            <Form.Group as={Row}>
                                <Form.Label column>Button Text</Form.Label>
                                <Col>
                                    <Form.Control
                                    value={this.state.text}
                                    onChange={(e) => this.setState({text: e.target.value})}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column>Button Size</Form.Label>
                                <Col>
                                    <Form.Control as="select" defaultValue="Normal" onChange={(e) => this.setState({size: this.checkSize(e.target.value)})}>
                                        <option>Small</option>
                                        <option>Normal</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column>Background Color</Form.Label>
                                <Col>
                                    <input type="color" onChange={(e) => this.setState({backcolor: e.target.value})} value={this.state.backcolor}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                            <Form.Label column>Font Color</Form.Label>
                                <Col>
                                    <input type="color" onChange={(e) => this.setState({fontcolor: e.target.value})} value={this.state.fontcolor}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} style={{marginLeft: "1px"}}>
                                <Form.Check
                                    type={"checkbox"}
                                    checked={this.state.isRound}
                                    onChange={(e) => this.setState({isRound: e.target.checked})}
                                    label={"Button is Rounded"}
                                />
                            </Form.Group>
                        </div>
                        <div style={{margin: "auto"}}>
                            <div className="bulma" dangerouslySetInnerHTML={{__html: `<button class="button ${this.state.size} ${this.state.isRound ? "is-rounded" : ""}" style="background-color: ${this.state.backcolor}; color: ${this.state.fontcolor}">${this.state.text}</button>`}} />
                        </div>
                        
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
export default ButtonModal;
