import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";


class CardModal extends Component {
  constructor(props) {
    super(props);
    var templates = this.props.currentFragment.id < 0 ? [this.props.currentFragment.class_attr] : this.props.currentFragment.templates
    this.state = {
      name: "new-card",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      url: "https://bulma.io/images/placeholders/1280x960.png",
      width: "100",
      height: "100",
      wUnits: "%",
      hUnits: "%",
      textValue: "",
      color: "#FFFFFF"
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment) {
      var templates = newProps.currentFragment.id < 0 ? [newProps.currentFragment.class_attr] : newProps.currentFragment.templates
      this.setState({
        name: "new-card",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        url: "https://bulma.io/images/placeholders/1280x960.png",
        width: "100",
        height: "100",
        wUnits: "%",
        hUnits: "%",
        textValue: "",
        color: "#FFFFFF"
      });
    }
  }

  createFrag = () => {
    var currLayout = this.layoutValues && this.layoutValues.state.value ? this.layoutValues.state.value.map(d => d.value) : []
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}">
      <div class="card" style="background-color: ${this.state.color}; width: ${this.state.width + this.state.wUnits}; height: ${this.state.height + this.state.hUnits}">
        <div class="card-image">
          <figure class="image is-4by3" style="margin: 0">
            <img src=${this.state.url} alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            ${this.state.textValue}
          </div>
        </div>
      </div>
    </div>`
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
        this.props.updateList();
        this.props.refresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addToLayouts = (templates) => {
    var str = `<div class="content" data-child-limit="1" data-child-type="${this.state.name}"></div>\n`
    this.props.layoutOptions.forEach(layout => {
      if (templates.includes(layout.class_attr)){
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

  onEditorChange = (value, delta, source, editor) => {
    this.setState({
      textValue: editor.getHTML()
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
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>Create a Card Component</Modal.Title>
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
              <div style={{ margin: "1em" }}>
                <h4>Image Settings</h4>
                <div
                  style={{ padding: "1em", paddingTop: "1vh", display: "flex" }}
                >
                  <div style={{ marginTop: "2em" }}>
                    <Form.Group as={Row}>
                      <Form.Label column md={"auto"}>
                        Image URL
                      </Form.Label>
                      <Col>
                        <Form.Control
                          defaultValue={this.state.url}
                          onChange={(e) =>
                            this.setState({ url: e.target.value })
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column>Background Color</Form.Label>
                        <Col>
                          <input type="color" onChange={(e) => this.setState({color: e.target.value})} value={this.state.color}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column>Width</Form.Label>
                      <Col>
                        <Form.Control
                          defaultValue={this.state.width}
                          onChange={(e) =>
                            this.setState({ width: e.target.value })
                          }
                        />
                      </Col>
                      <Col md={"auto"} style={{ margin: "0", padding: "0" }}>
                        <Form.Control
                          as="select"
                          style={{ margin: "0", padding: "0" }}
                          defaultValue={this.state.wUnits}
                          onChange={(e) =>
                            this.setState({ wUnits: e.target.value })
                          }
                        >
                          <option>px</option>
                          <option>em</option>
                          <option>vh</option>
                          <option>rem</option>
                          <option>%</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column>Height</Form.Label>
                      <Col>
                        <Form.Control 
                        defaultValue={this.state.height}
                        onChange={(e) => this.setState({height: e.target.value})}
                        />
                      </Col>
                      <Col md={"auto"} style={{ margin: "0", padding: "0" }}>
                        <Form.Control
                          as="select"
                          style={{ margin: "0", padding: "0" }}
                          defaultValue={this.state.hUnits}
                          onChange={(e) =>
                            this.setState({hUnits: e.target.value })
                          }
                        >
                          <option>px</option>
                          <option>em</option>
                          <option>vh</option>
                          <option>rem</option>
                          <option>%</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      margin: "auto",
                      overflow: "auto",
                      maxWidth: "15em",
                    }}
                  >
                    <div
                      className="bulma"
                      dangerouslySetInnerHTML={{
                        __html: `<figure class="image">
                        <img src=${this.state.url}>
                        </figure>`,
                      }}
                    />
                  </div>
                </div>
                </div>
              <div class="container" style={{ margin: "1em" }}>
                  <h4>Insert Text</h4>
                  <div style={{ height: "10em" }}>
                    <ReactQuill
                      style={{ height: "100%", width: "90%" }}
                      value={this.state.textValue}
                      onChange={this.onEditorChange}
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
export default CardModal;
