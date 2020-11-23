import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import axios from "axios";


class LevelModal extends Component {
  constructor(props) {
    super(props);
    var templates =
      this.props.currentFragment.id < 0
        ? [this.props.currentFragment.class_attr]
        : this.props.currentFragment.templates;
    var filtered = this.props.componentOptions.filter((d) => {
      return this.props.currentFragment.id >= 0
        ? d.class_attr !== "initizalingTemplateComponent" &&
            this.props.currentFragment.templates.some((r) =>
              d.templates.includes(r)
            ) &&
            d.class_attr !== this.props.currentFragment.class_attr
        : d.class_attr !== "initizalingTemplateComponent" &&
            d.templates.includes(this.props.currentFragment.class_attr);
    });
    this.state = {
      name: "new-level",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      options:
        filtered !== []
          ? filtered.map((d) => ({
              label: d.class_attr,
              value: d.class_attr,
              id: d.id,
            }))
          : [],
      type: "default",
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment) {
      var templates =
        newProps.currentFragment.id < 0
          ? [newProps.currentFragment.class_attr]
          : newProps.currentFragment.templates;
      var filtered = newProps.componentOptions.filter((d) => {
        return newProps.currentFragment.id >= 0
          ? d.class_attr !== "initizalingTemplateComponent" &&
              newProps.currentFragment.templates.some((r) =>
                d.templates.includes(r)
              ) &&
              d.class_attr !== newProps.currentFragment.class_attr
          : d.class_attr !== "initizalingTemplateComponent" &&
              d.templates.includes(newProps.currentFragment.class_attr);
      });
      this.setState({
        name: "new-level",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        options:
          filtered !== []
            ? filtered.map((d) => ({
                label: d.class_attr,
                value: d.class_attr,
                id: d.id,
              }))
            : [],
        type: "default",
      });
    }
  }

  createFrag = () => {
    var currLayout =
      this.layoutValues && this.layoutValues.state.value
        ? this.layoutValues.state.value.map((d) => d.value)
        : [];
    var str = ``;
    if (this.state.type === "default") {
        if (this.center && this.center.state.value) {
            this.center.state.value.forEach((d) => str = str + `<div class="level-item">\n<div class="content" data-child-limit="1" data-child-type="${d.value}"></div>\n</div>\n`);
        }
        
    } else {
        str = str + `<div class="level-left">`;
        if (this.left && this.left.state.value) {
            this.left.state.value.forEach((d) => str = str + `<div class="level-item"><div class="content" data-child-limit="1" data-child-type="${d.value}"></div>\n</div>\n`);
        }
        str = str + `</div>\n<div class="level-right">`;
        if (this.right && this.right.state.value) { 
            this.right.state.value.forEach((d) => str = str + `<div class="level-item"><div class="content" data-child-limit="1" data-child-type="${d.value}"></div>\n</div>\n`)
        }
        str = str + `</div>`
    }
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}">
    <div class="level">
        ${str}
    </div>
    </div>`;
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
        this.props.hideModal();
        console.log(result);
        this.addToLayouts(currLayout);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addToLayouts = (templates) => {
    var str = `<div class="content" data-child-limit="1" data-child-type="${this.state.name}"></div>\n`;
    var count = 0;
    this.props.layoutOptions.forEach((layout) => {
      if (templates.includes(layout.class_attr)) {
        var html = layout.html;
        var index = html.lastIndexOf(`</body>`);
        var isLast = templates.length === ++count ? true : false;
        html = html.substring(0, index) + str + html.substring(index);
        this.quickChange(layout.id, html, layout.file_name, isLast);
      }
    });
  };

  quickChange = (id, html, filename, isLast) => {
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
        isLast ? this.props.updateList() : console.log();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          <Modal.Title as={"h2"} style={{ margin: "2vh", marginBottom: "0" }}>
            Create a Level Component
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "40em" }}>
          <Tabs
            defaultTab="vertical-tab-one"
            vertical
            className="vertical-tabs"
            style={{ height: "100%" }}
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
                <p style={{ marginBottom: "1em" }}>
                  Horizontally center almost any component within a level
                  component. See{" "}
                  <a
                    href="https://bulma.io/documentation/layout/level/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bulma
                  </a>{" "}
                  documentation for more information.{" "}
                </p>
                <h4>General Settings</h4>
                <div style={{ padding: "1em", paddingTop: "1vh" }}>
                  <Form.Group as={Row}>
                    <Form.Label column>Component Name</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Descriptive Labels</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.labels}
                        onChange={(e) =>
                          this.setState({ labels: e.target.value })
                        }
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Pages</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.pages}
                        onChange={(e) =>
                          this.setState({ pages: e.target.value })
                        }
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
                        ref={(input) => (this.layoutValues = input)}
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
                <Row>
                  <Col md={"auto"}>
                    <h4>Level Content</h4>
                  </Col>
                  <Col md={"auto"}>
                    <Form.Control
                      as="select"
                      defaultValue="default"
                      onChange={(e) => this.setState({ type: e.target.value })}
                    >
                      <option>default</option>
                      <option>left-right</option>
                    </Form.Control>
                  </Col>
                </Row>
                {this.state.type === "default" ? (
                  <div style={{ margin: "2em" }}>
                    <h5 style={{ marginBottom: "1em" }}>
                      Default Level Aligment
                    </h5>
                    <div style={{ marginLeft: "2em", width: "80%" }}>
                      <Select
                        isMulti
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={[]}
                        options={this.state.options}
                        ref={(input) => (this.center = input)}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ margin: "2em" }}>
                    <h5 style={{ marginBottom: "1em" }}>Left Level Aligment</h5>
                    <div
                      style={{
                        marginLeft: "1em",
                        marginBottom: "3em",
                        width: "80%",
                      }}
                    >
                      <Select
                        isMulti
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={[]}
                        options={this.state.options}
                        ref={(input) => (this.left = input)}
                      />
                    </div>
                    <h5 style={{ marginBottom: "1em" }}>
                      Right Level Aligment
                    </h5>
                    <div
                      style={{
                        marginLeft: "1em",
                        marginBottom: "1em",
                        width: "80%",
                      }}
                    >
                      <Select
                        isMulti
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={[]}
                        options={this.state.options}
                        ref={(input) => (this.right = input)}
                      />
                    </div>
                  </div>
                )}
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
export default LevelModal;
