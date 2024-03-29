import React, { Component } from "react";
import { Modal, Col, Row, Form, Button, Card } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Select from "react-select";
import JointInput from "./JointInput";
import Toast from 'light-toast';
import axios from "axios";
import { createfragcomponent,editinFragment } from "./MiddleLayer";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");


const SortableItem = sortableElement(({value}) => (<li>{value}</li>));

const SortableContainer = sortableContainer(({children}) => {return <ul>{children}</ul>;});

var str;
var count = 1;

class FragmentModal extends Component {
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
    str = this.props.currentFragment.html
    this.state = {
      name: props.currentFragment.class_attr,
      id: props.currentFragment.id,
      labels: props.currentFragment.labels,
      pages: props.currentFragment.pages,
      templates: props.currentFragment.templates,
      html: props.currentFragment.html,
      file_name: props.currentFragment.file_name,
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
      str = newProps.currentFragment.html;
      this.setState({
        name: newProps.currentFragment.class_attr,
        id: newProps.currentFragment.id,
        labels: newProps.currentFragment.labels,
        pages: newProps.currentFragment.pages,
        templates: newProps.currentFragment.templates,
        html: newProps.currentFragment.html,
        file_name: newProps.currentFragment.file_name,
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
    if (!newProps.currentJoints.length) {
      this.setState({
        joints: [],
      });
    } else if (
      JSON.stringify(newProps.currentJoints) !==
      JSON.stringify(this.props.currentJoints)
    ) {
      var newJoints = [];

      if (
        newProps.currentJoints.length &&
        newProps.currentJoints !== this.state.joints
      ) {
        var defaultJoints = [];
        newProps.currentJoints.forEach((joint) => {
          defaultJoints = [];
          joint.map((d) => defaultJoints.push({ label: d, value: d }));
          var id = count;
          newJoints.push(
            <JointInput
              key={count++}
              ref={input => this[this.state.name + id.toString()] = input}
              defaultValue={defaultJoints}
              options={this.state.options}
              onDelete={() => this.deleteJoint(id)}
            />
          );
        });
        this.setState({
          joints: newJoints,
        });
      }
    }
  }

  addJoint = (value) => {
    if (this.state.joints.length < 8) {
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
      Toast.fail("Limit of Dynamic Components is 8");
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
    var previous = this.props.currentJoints;
    var newJoints = [];
    this.state.joints.forEach(joint => {
      var refname = this.state.name + joint.key
      if (this[refname].state.value !== ""){
        newJoints.push(this[refname].state.value.map(d => d.value))
      }
    })
    var innerHtml = this.state.html
    var str = ``;
    if (JSON.stringify(previous) !== JSON.stringify(newJoints)){
      previous.forEach((joint) => {
        innerHtml = innerHtml.replace(`<div data-child-limit="${joint.length}" data-child-type="${joint.join(", ")}"></div>`, ``)
      })
      newJoints.forEach((newJoint) => {
        str = str + `<div data-child-limit="${newJoint.length}" data-child-type="${newJoint.join(", ")}"></div>\n`
      })
      var index = this.state.id >= 0 ? innerHtml.lastIndexOf(`</div>`) : innerHtml.lastIndexOf(`</body>`);
      innerHtml = innerHtml.substring(0, index) + str + innerHtml.substring(index);
    }
    return innerHtml;
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({joints}) => ({
      joints: arrayMove(joints, oldIndex, newIndex),
    }));
  };

  updateHtml = () => {
    if (this.state.name !== this.props.currentFragment.class_attr){
      str = str.replace(/class="(.*?)"/, `class="` + this.state.name + `"`);
    }
    
    if (JSON.stringify(this.state.labels) !== JSON.stringify(this.props.currentFragment.labels)){
      str = str.replace(/data-label="(.*?)"/, `data-label="` + this.state.labels + `"`);
    }
    
    if (JSON.stringify(this.state.pages) !== JSON.stringify(this.props.currentFragment.pages)){
      str = str.replace(/data-page="(.*?)"/, `data-page="` + this.state.pages + `"`);
    }
  
    var currLayout = this.layoutValues && this.layoutValues.state.value ? this.layoutValues.state.value.map(d => d.value).join() : ""
    if (currLayout !== this.props.currentFragment.templates.join()) {
      str = str.replace(/data-template="(.*?)"/, `data-template="` + currLayout + `"`)
    }
     
    if (str !== this.state.html) {
      this.setState({ 
        html: str
      })
    }
  };

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
    if (this.state.id < 0){
      this.createTemplateStart()
    }
    var html = this.changeHTMLJoints()
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
    createfragcomponent(data,axiosConfig).then((result) => {
      this.props.updateList(this.state.id);
      this.props.toggleModal();
    }).catch(function(error) {
      Toast.fail('Invalid HTML. \nPlease check code editor for syntax errors.')
      console.log(error);
    });
  };

  editFrag = () => {
    var html = this.changeHTMLJoints()
    const url = `http://localhost:5000/fragments/` + this.state.id;
    let data = JSON.stringify({
      html: html,
      file: this.state.file_name + ".html",
    });
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    editinFragment(url,data,axiosConfig).then((result) => {
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

    this.props.layoutOptions.map((d) =>
      optionsTemp.push({ label: d.class_attr, value: d.class_attr })
    );
    this.state.templates.map((d) => selectedTemps.push({ label: d, value: d }));

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.toggleModal}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ border: "none", marginBottom: "0", paddingBottom: "0" }}
          closeButton
        >
          <Modal.Title as={"h2"} style={{margin: "2vh", marginBottom: "0"}}>{this.props.title + `: "` + this.props.currentFragment.class_attr + `"`}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "40em" }}>
        <Tabs
            defaultTab="vertical-tab-one"
            vertical
            className="vertical-tabs"
            style={{height: "100%"}}
            onChange={(tabId) => {
              if (tabId === "vertical-tab-three") {
                this.updateHtml();
              }
            }}
          >
            <TabList style={{ width: "20%", textAlign: "left" }}>
              <Tab tabFor="vertical-tab-one">General Settings</Tab>
              <Tab tabFor="vertical-tab-two">Dynamic Content</Tab>
              <Tab tabFor="vertical-tab-three">Code Editor</Tab>
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
                      {this.props.title.includes("Edit") ? 
                      <Form.Control
                      defaultValue={this.state.name}
                      disabled
                      />
                      :
                      <Form.Control
                        defaultValue={this.state.name}
                        onChange={(e)=>{this.setState({name: e.target.value}, () => this.updateHtml)}}
                      />}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Descriptive Labels</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.labels}
                        onChange={(e)=>{this.setState({labels: e.target.value}, () => this.updateHtml)}}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Pages</Form.Label>
                    <Col>
                      <Form.Control
                        defaultValue={this.state.pages}
                        onChange={(e)=>{this.setState({pages: e.target.value}, () => this.updateHtml)} }
                      />
                    </Col>
                  </Form.Group>

                  {this.state.id >= 0 ? (
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
                  ) : null}

                  {this.state.id >= 0 ? 
                  <>
                    <h4>Preview: </h4><br/>
                    <Card>
                      <Card.Header style={{ height: "17em", overflow: "auto"}}>
                        <div className="bulma" dangerouslySetInnerHTML={{__html: this.state.html}} />
                      </Card.Header>
                    </Card>
                  </>
                   : null}
                </div>
              </div>
            </TabPanel>

            <TabPanel
              tabId="vertical-tab-two"
              style={{ height: "100%", width: "100%" }}
            >
                <div class="container" style={{ margin: "1em" }}>
                  <h4>Add Nested Dynamic Content</h4>
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

            <TabPanel
              tabId="vertical-tab-three"
              style={{ height: "100%", width: "100%" }}
            >
              <div class="container" style={{ margin: "1em", maxWidth: "45em"}}>
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
  }
}
export default FragmentModal;
