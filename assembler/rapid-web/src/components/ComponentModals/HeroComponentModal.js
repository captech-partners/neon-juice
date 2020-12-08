import React, { Component } from "react";
import { Modal, Col, Row, Form, Button, Card } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import { createFragment, editFragment } from "../APIMiddleLayer";


class HeroModal extends Component {
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
      name: "new-banner",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      options: filtered !== [] ? filtered.map((d) => ({
        label: d.class_attr,
        value: d.class_attr,
        id: d.id,
      })) : [],
      url: "",
      fontcolor: "#000000",
      backcolor: "#FFFFFF",
      size: "medium",
      title: "",
      subtitle: ""
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment || newProps.componentOptions !== this.props.componentOptions) {
      var templates = newProps.currentFragment.id < 0 ? [newProps.currentFragment.class_attr] : newProps.currentFragment.templates;
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
        name: "new-banner",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        options: filtered !== [] ? filtered.map((d) => ({
          label: d.class_attr,
          value: d.class_attr,
          id: d.id,
        })) : [],
        url: "",
        fontcolor: "#000000",
        backcolor: "#FFFFFF",
        size: "medium",
        title: "",
        subtitle: ""
      });
    }
  }

  createFrag = () => {
    var currLayout =
      this.layoutValues && this.layoutValues.state.value
        ? this.layoutValues.state.value.map((d) => d.value)
        : [];
    var headerNav = this.navigation && this.navigation.state.value ? `<div class="hero-header">
      <div data-child-limit="1" data-child-type="${this.navigation.state.value.value}"></div>
    </div>` : ``;
    var background = this.state.url !== "" ? `background-image:url('${this.state.url}'); background-size:cover;` : ``;
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}">
      <section class="hero is-${this.state.size}" style="background-color: ${this.state.backcolor}; color: ${this.state.fontcolor}; ${background}">
        ${headerNav}
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              ${this.state.title}
            </h1>
            <h2 class="subtitle">
              ${this.state.subtitle}
            </h2>
          </div>
        </div>
      </section>
    </div>`;
    
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
          <Modal.Title as={"h2"} style={{ margin: "2vh", marginBottom: "0" }}>
            Create a Banner Component
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
              <Tab tabFor="vertical-tab-three">Preview</Tab>
            </TabList>

            <TabPanel
              tabId="vertical-tab-one"
              style={{ height: "100%", width: "100%" }}
            >
              <div style={{ margin: "1em" }}>
                <h4>Description</h4>
                <p style={{marginBottom: "1em"}}>A banner or hero is a prominently placed image, slider, text or similar element at the top of the web page. See <a href="https://bulma.io/documentation/layout/hero/" target="_blank" rel="noopener noreferrer">Bulma</a> documentation for more information.</p>
                <p> <span style={{fontWeight: "bold"}}>Note: </span>If you want to embed a navigation bar within the banner/hero's header, you need to first create the component.</p>
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
                <h4>Banner Header</h4>
                <Form.Group as={Row}>
                  <Form.Label column md={"auto"}>Insert Navigation Bar</Form.Label>
                  <Col>
                    <Select
                      isClearable={false}
                      isSearchable={true}
                      placeholder={"Choose Navigation bar Component"}
                      options={this.state.options}
                      ref={(input) => (this.navigation = input)}
                    />
                  </Col>
                </Form.Group>
                <h4>Banner Body</h4>
                <div style={{ padding: "1em", paddingTop: "0"}}>
                  <div style={{ marginTop: "2em" }}>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>Title</Form.Label>
                      <Col>
                          <Form.Control
                          value={this.state.title}
                          onChange={(e) => this.setState({title: e.target.value})}
                          />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column md={2}>Subtitle</Form.Label>
                      <Col>
                          <Form.Control
                          value={this.state.subtitle}
                          onChange={(e) => this.setState({subtitle: e.target.value})}
                          />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column md={2}>
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
                      <Form.Label column md={"auto"}>Background Color</Form.Label>
                      <Col md={"auto"}>
                          <input type="color" onChange={(e) => this.setState({backcolor: e.target.value})} value={this.state.backcolor}/>
                      </Col>
                    
                      <Form.Label column md={"auto"}>Font Color</Form.Label>
                      <Col md={"auto"}>
                        <input type="color" onChange={(e) => this.setState({fontcolor: e.target.value})} value={this.state.fontcolor}/>
                      </Col>
                    
                      <Form.Label column md={2}>Size</Form.Label>
                      <Col md={"auto"}>
                        <Form.Control as="select" defaultValue="medium" onChange={(e) => this.setState({size: e.target.value})}>
                          <option>medium</option>
                          <option>large</option>
                          <option>fullheight</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel
              tabId="vertical-tab-three"
              style={{ height: "100%", width: "100%" }}
            >
              <div
                style={{
                  margin: "1em",
                }}
              >
                <h4>Preview: </h4>
                  <Card>
                    <Card.Header style={{width: "100%", height: "35em", overflow: "auto"}}>
                      <div className="bulma" dangerouslySetInnerHTML={{__html:` 
                      <section class="hero is-${this.state.size}" style="background-color: ${this.state.backcolor}; ${this.state.url !== "" ? `background-image:url('${this.state.url}'); background-size:cover` : ``}">
                        <div class="hero-header">
                          <div data-child-limit="1" data-child-type="${this.navigation && this.navigation.state && this.navigation.state.value ? this.navigation.state.value.value : ""}"></div>
                        </div>
                        <div class="hero-body">
                          <div class="container">
                            <h1 class="title" style="color: ${this.state.fontcolor}">
                              ${this.state.title}
                            </h1>
                            <h2 class="subtitle" style="color: ${this.state.fontcolor}">
                              ${this.state.subtitle}
                            </h2>
                          </div>
                        </div>
                      </section>
                    `}} />
                    </Card.Header>
                  </Card>
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
export default HeroModal;
