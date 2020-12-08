import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import { createFragment, editFragment } from "../APIMiddleLayer";


class MenuModal extends Component {
  constructor(props) {
    super(props);
    var templates =
      this.props.currentFragment.id < 0
        ? [this.props.currentFragment.class_attr]
        : this.props.currentFragment.templates;
    this.state = {
      name: "new-menu",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      fontcolor: "#000000",
      backcolor: "#FFFFFF",
      width: "",
      height: "",
      url: "",
      type: "navbar",
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment) {
      var templates =
        newProps.currentFragment.id < 0
          ? [newProps.currentFragment.class_attr]
          : newProps.currentFragment.templates;
      this.setState({
        name: "new-menu",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        fontcolor: "#000000",
        backcolor: "#FFFFFF",
        width: "",
        height: "",
        url: "",
        type: "navbar",
      });
    }
  }

  createFrag = () => {
    var currLayout =
      this.layoutValues && this.layoutValues.state.value
        ? this.layoutValues.state.value.map((d) => d.value)
        : [];
    var str = ``;
    var i;
    if (this.state.type === "navbar") {
        str = str + `<nav class="navbar is-transparent" role="navigation" aria-label="main navigation" style="background-color: ${this.state.backcolor}; color: ${this.state.fontcolor}">\n`;
        if (this.state.url !== "") {
            str = str + `<div class="navbar-brand">
            <a class="navbar-item">
              <img src="${this.state.url}" width="${this.state.width !== "" ? this.state.width : "auto"}" height="${this.state.height !== "" ? this.state.height : 28}">
            </a>
        
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>\n`
        }
        str = str + `<div id="navbarBasicExample" class="navbar-menu">\n<div class="navbar-start">\n`;
        for (i = 1; i <= 6 ; ) {
            if (this["NavigationText" + i].value) {
                str = str + `<a class="navbar-item" href="${this["NavigationLink" + i].value}">${this["NavigationText" + i].value}</a>`;
            }
            i++;
        }
        str = str + `</div>\n</div>\n<script>
        $(document).ready(function() {
            $(".navbar-burger").click(function() {
                $(".navbar-burger").toggleClass("is-active");
                $(".navbar-menu").toggleClass("is-active");
            });
        });
    </script>`
    } else {
        str = str + `<aside class="menu" style="background-color: ${this.state.backcolor}; color: ${this.state.fontcolor}; width: 20em; height: 100vh; overflow: auto; padding: 1em">\n<ul class="menu-list" style="list-style-type: none">`;
        for (i = 1; i <= 6 ; ) {
            if (this["NavigationText" + i].value !== "") {
                str = str + `<li><a href="${this["NavigationLink" + i].value}">${this["NavigationText" + i].value}</a><li>`;
            }
            i++;
        }
        str = str + `</ul></aside>`
    }
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}">
        ${str}
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
    var str = `<div data-child-limit="1" data-child-type="${this.state.name}"></div>\n`;
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
            Create a Menu Component
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
                  Create either a horizontal navigation, Navbar, or a vertically navigation, Side Menu. <br/>See <a href="https://bulma.io/documentation/components/navbar/" target="_blank" rel="noopener noreferrer">Navbar</a> and <a href="https://bulma.io/documentation/components/menu/" target="_blank" rel="noopener noreferrer">Menu</a> documentation for more information.{" "}
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
                    <h4>Menu Content</h4>
                  </Col>
                  <Col md={"auto"}>
                    <Form.Control
                      as="select"
                      defaultValue="default"
                      onChange={(e) => this.setState({ type: e.target.value })}
                    >
                      <option>navbar</option>
                      <option>side menu</option>
                    </Form.Control>
                  </Col>
                </Row>
                <div style={{ margin: "1em" }}>
                    {this.state.type === "navbar" ? (
                        <>
                            <h5 style={{ marginBottom: "1em" }}>
                            Navigation Bar
                            </h5>
                            <div style={{ margin: "1em" }}>
                                <Form.Group as={Row}>
                                    <Form.Label column md={"auto"}>
                                        Navbar Logo Image URL
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                        defaultValue={this.state.url}
                                        onChange={(e) =>
                                            this.setState({ url: e.target.value })
                                        }
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                        placeholder={"Width"}
                                        onChange={(e) =>
                                            this.setState({ width: e.target.value })
                                        }
                                        />
                                    </Col>
                                    <Col md={2}> 
                                        <Form.Control
                                        placeholder={"Height"}
                                        onChange={(e) =>
                                            this.setState({ height: e.target.value })
                                        }
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                        </>
                    ) : (
                        <h5 style={{ marginBottom: "1em" }}>
                            Side Menu
                        </h5>
                    )}
                    <div style={{ margin: "1em" }}>
                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>Background Color</Form.Label>
                            <Col>
                                <input type="color" onChange={(e) => this.setState({backcolor: e.target.value})} value={this.state.backcolor}/>
                            </Col>
                        
                            <Form.Label column md={"auto"}>Font Color</Form.Label>
                            <Col>
                                <input type="color" onChange={(e) => this.setState({fontcolor: e.target.value})} value={this.state.fontcolor}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <h5 style={{ marginBottom: "1em" }}>
                        Navigation Items
                    </h5>
                    <div style={{ margin: "1em" }}>
                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 1
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText1 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink1 = input)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 2
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText2 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink2 = input)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 3
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText3 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink3 = input)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 4
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText4 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink4 = input)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 5
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText5 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink5 = input)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md={"auto"}>
                                Navigation Item 6
                            </Form.Label>
                            <Col md={3}>
                                <Form.Control
                                placeholder={"Text"}
                                ref={(input) => (this.NavigationText6 = input)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                placeholder={"Link URL"}
                                ref={(input) => (this.NavigationLink6 = input)}
                                />
                            </Col>
                        </Form.Group>
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
export default MenuModal;
