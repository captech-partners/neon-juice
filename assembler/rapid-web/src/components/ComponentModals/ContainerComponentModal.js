import React, { Component } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import JointInput from "../JointInput";
import Toast from 'light-toast';
import { createFragment, editFragment } from "../APIMiddleLayer";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const SortableItem = sortableElement(({value}) => (<li>{value}</li>));

const SortableContainer = sortableContainer(({children}) => {return <ul>{children}</ul>;});


var count = 1;

class ContainerModal extends Component {
  constructor(props) {
    super(props);
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
    var templates = this.props.currentFragment.id < 0 ? [this.props.currentFragment.class_attr] : this.props.currentFragment.templates
    this.state = {
      name: "new-container",
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: templates,
      width: 100,
      html: ``,
      joints: [],
      options: filtered !== [] ? filtered.map((d) => ({
        label: d.class_attr,
        value: d.class_attr,
        id: d.id,
      })) : [],
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentFragment !== this.props.currentFragment) {
        var templates = newProps.currentFragment.id < 0 ? [newProps.currentFragment.class_attr] : newProps.currentFragment.templates
      this.setState({
        name: "new-container",
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: templates,
        width: 100,
        html: ``,
        joints: []
      });
    }

    if (newProps.componentOptions !== this.props.componentOptions || newProps.currentFragment !== this.props.currentFragment) {
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
        options: filtered !== [] ? filtered.map((d) => ({
          label: d.class_attr,
          value: d.class_attr,
          id: d.id,
        })) : [],
      });
    }
  }

  addJoint = (value) => {
    if (this.state.joints.length < 5) {
      var id = count;
      this.setState({
        joints: [
          ...this.state.joints,
          <JointInput
            key={count++}
            ref={input => this[this.state.name + id.toString()] = input}
            defaultValue={value}
            options={this.state.options}
            onDelete={() => this.deleteJoint(id)}
          />,
        ],
      });
    } else {
      Toast.fail("Limit of Dynamic Components is 5");
    }
  };

  deleteJoint = (id) => {
    const changedJoints = this.state.joints.filter(
      (d) => d.key !== id.toString()
    );
    this.setState({
      joints: changedJoints,
    });
  };

  changeHTMLJoints = () => {
    var joints = [];
    this.state.joints.forEach(joint => {
      var refname = this.state.name + joint.key
      if (this[refname].state.value !== ""){
        joints.push(this[refname].state.value.map(d => d.value))
      }
    })
    var innerHtml = this.state.html
    var str = ``;
    joints.forEach((joint) => {
        str = str + `<div data-child-limit="${joint.length}" data-child-type="${joint.join(", ")}"></div>\n`
    })
    var index = this.state.id >= 0 ? innerHtml.lastIndexOf(`</div>`) : innerHtml.lastIndexOf(`</body>`);
    innerHtml = innerHtml.substring(0, index) + str + innerHtml.substring(index);
    
    return innerHtml;
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({joints}) => ({
      joints: arrayMove(joints, oldIndex, newIndex),
    }));
  };

  createFrag = () => {
    var currLayout = this.layoutValues && this.layoutValues.state.value ? this.layoutValues.state.value.map(d => d.value) : []
    var html = `<div class="${this.state.name}" data-label="${this.state.labels}" data-page="${this.state.pages}" data-template="${currLayout === [] ? "" : currLayout.join()}" data-id="${this.state.id}" >\n<div class="container" style="width: ${this.state.width}%">`
    var innerHtml = this.changeHTMLJoints();
    html = html + `${innerHtml}</div>\n</div>`;
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
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>Create a Container Component</Modal.Title>
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
              <Tab tabFor="vertical-tab-two">Container Content</Tab>
            </TabList>

            <TabPanel
              tabId="vertical-tab-one"
              style={{ height: "100%", width: "100%" }}
            >
              <div style={{ margin: "1em" }}>
                <h4>Description</h4>
                <p style={{marginBottom: "1em"}}>A container centers content horizontally. See <a href="https://bulma.io/documentation/layout/container/" target="_blank" rel="noopener noreferrer">Bulma</a> documentation for more information.</p>
                <h4>General Settings</h4>
                <div style={{padding: "1em", paddingTop: "1vh"}}>
                  <Form.Group as={Row}>
                    <Form.Label column>Component Name</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.name}
                        onChange={(e)=>this.setState({name: e.target.value})}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Descriptive Labels</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.labels}
                        onChange={(e)=>this.setState({labels: e.target.value})}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Pages</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.pages}
                        onChange={(e)=>this.setState({pages: e.target.value})}
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
                            onChange={this.updateHtml}
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
                    <h4>Container Width</h4>
                    <div style={{width: "80%", display: "flex"}}>
                        <Form.Control
                            value={this.state.width}
                            onChange={(e) => {
                            this.setState({ width: e.target.value });
                            }}
                            type="range"
                            min="50"
                            max="100"
                        />
                        <h5 style={{marginLeft: "1em", fontWeight: "lighter"}}>{this.state.width}%</h5>
                    </div>
                  <h4>Add Container Content</h4>
                  <div
                    style={{
                      marginLeft: "1em",
                      marginRight: "0",
                      marginBottom: "0",
                      paddingBottom: "0",
                    }}
                  >
                    <Form.Label>Choose Components</Form.Label>
                    
                    {!this.state.joints.length ? <br /> :
                    <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.joints.map((value, index) => (
                      <SortableItem key={`item-${index}`} index={index} value={value} />
                    ))}
                  </SortableContainer>
                    }
                    <Button onClick={() => this.addJoint("")}>
                      + Add Another Component
                    </Button>
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
export default ContainerModal;
