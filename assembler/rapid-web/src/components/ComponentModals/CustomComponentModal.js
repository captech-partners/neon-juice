import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import { createFragment, editFragment } from "../APIMiddleLayer";
//Code Mirror Imports
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");

class CustomModal extends Component {
  constructor(props) {
    super(props);
    var templates = this.props.currentFragment.id < 0 ? [this.props.currentFragment.class_attr] : this.props.currentFragment.templates
    this.state = {
      name: "custom-component",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      html: "",
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment) {
      var templates = newProps.currentFragment.id < 0 ? [newProps.currentFragment.class_attr] : newProps.currentFragment.templates
      this.setState({
        name: "custom-component",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        html: ""
      });
    }
  }

  createFrag = () => {
    var currLayout = this.layoutValues && this.layoutValues.state.value ? this.layoutValues.state.value.map(d => d.value) : []
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}">\n${this.state.html}\n</div>`;
    let data = JSON.stringify({
      html: html,
      file: this.state.name + ".html",
    });
    
    createFragment(data).then((result) => {
      this.props.hideModal();
      console.log(result);
      this.addToLayouts(currLayout);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  addToLayouts = (templates) => {
    var str = `<div data-child-limit="1" data-child-type="${this.state.name}"></div>\n`
    var count = 0;
    this.props.layoutOptions.forEach((layout) => {
      if (templates.includes(layout.class_attr)){
        var html = layout.html;
        var index = html.lastIndexOf(`</body>`);
        var isLast = templates.length === ++count ? true : false;
        html = html.substring(0, index) + str + html.substring(index);
        this.quickChange(layout.id, html, layout.file_name, isLast)        
      }
    })
  }

  quickChange = (id, html, filename, isLast) => {
    let data = JSON.stringify({
      html: html,
      file: filename + ".html",
    });
    
    editFragment(id,data).then((result) => {
      console.log(result);
      isLast ? this.props.updateList() : console.log()
    })
    .catch(function (error) {
      console.log(error);
    });
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
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>Create Custom Component</Modal.Title>
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
                      options={optionsTemp}
                      ref={input => this.layoutValues = input}
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
                <div class="container" style={{ margin: "1em" }}>
                    <h4>HTML Code</h4>
                    <div style={{ height: "30em", marginRight:"1em" }}>
                    <CodeMirror
                        value={this.state.outputText}
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
export default CustomModal;
