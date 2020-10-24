import React, { Component } from "react";
import { Button, Accordion, Card, ListGroup, OverlayTrigger, FormControl, Navbar, Form, Popover, Tooltip, Row , Image} from "react-bootstrap";
import { faPlus, faSearch, faRedo , faCopy, faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import componentSearch from "../tutorial_assets/componentSearch.png";
import componentOptions from "../tutorial_assets/componentOptions.png";
import componentModal from "../tutorial_assets/componentModal.png";
import layoutSearch from "../tutorial_assets/layoutSearch.png";
import layoutOptions from "../tutorial_assets/layoutOptions.png";
import layoutModal from "../tutorial_assets/layoutModal.png";

class FragmentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    var searchFragment = this.props.searchFragment;
    var searchTemplate = this.props.searchTemplate;
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>

            <OverlayTrigger
              trigger={['focus','hover']}
              placement={"right-start"}
              overlay={
                this.props.tutorialEnabled ? 
                <Popover style={{width: '45em', padding: '2em'}}>
                  <Popover.Content>
                    <h4>Managing Components</h4>
                    <br/>
                    <Row>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={componentSearch}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Search for Components</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Filter Components by Name</Card.Subtitle>
                            <Card.Text>
                              Type in the name of the component you would like to see and click on the <FontAwesomeIcon icon={faSearch} /> button to search the list. To reset the search list click on the <FontAwesomeIcon icon={faRedo} /> button.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <br/>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={componentOptions}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Component Options</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Add, Edit, Duplicate & Delete</Card.Subtitle>
                            <Card.Text>
                              Click on a component to show the Component Options: <br/>
                              <FontAwesomeIcon icon={faPlus} /> adding component to viewed layout<br/>
                              <FontAwesomeIcon icon={faCopy} /> duplicate current component<br/>
                              <FontAwesomeIcon icon={faEdit} /> edit current component<br/>
                              <FontAwesomeIcon icon={faTrashAlt} /> delete current component
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <br/>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={componentModal}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Component Settings</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Set Name, Pages,Labels & Etc</Card.Subtitle>
                            <Card.Text>
                              Click on the Edit, Duplicate, or Create buttons to open the Component Settings. Change or enter the values you want for your component.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </Row>
                  </Popover.Content>
                </Popover> :
                <Tooltip style={{opacity: '0'}}></Tooltip>
              }
            >
              <Accordion.Toggle
                as={Button}
                onClick={this.props.hidePopover}
                style={{
                  backgroundColor: "transparent",
                  outline: "0",
                  color: "black",
                  border: "none",
                }}
                eventKey="0"
              >
                Components
              </Accordion.Toggle>
            </OverlayTrigger>
            
            <Button
              style={{
                backgroundColor: "transparent",
                outline: "0",
                color: "black",
                border: "none",
              }}
              onClick={this.props.createFragment}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body
              style={{ height: "46em", overflowY: "auto", padding: "0" }}
              onScroll={this.props.hidePopover}
            >
              <Navbar sticky="top" variant="light">
                <Form inline>
                  <FormControl
                    placeholder="Type to search..."
                    onChange={(e) => this.setState({ value: e.target.value })}
                    value={this.state.value}
                  />
                  <Button
                    onClick={() => searchFragment(this.state.value)}
                    style={{ marginLeft: "10px" }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    onClick={() => searchFragment("")}
                    style={{ marginLeft: "5px" }}
                  >
                    <FontAwesomeIcon icon={faRedo} />
                  </Button>
                </Form>
              </Navbar>
              <ListGroup variant="flush" value={this.props.fragList}>
                {this.props.fragList.map((d) => (
                  <ListGroup.Item
                    key={d.id}
                    id={d.id}
                    action
                    onClick={this.props.handleFragmentButtons}
                  >
                    {d.class_attr === null ? "No Name" : d.class_attr}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <OverlayTrigger
              trigger={['focus','hover']}
              placement={"right-start"}
              overlay={
                this.props.tutorialEnabled ? 
                <Popover style={{width: '45em', padding: '2em'}}>
                  <Popover.Content>
                    <h4>Managing Layouts</h4>
                    <br/>
                    <Row>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={layoutSearch}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Search for Layouts</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Filter Layouts by Name</Card.Subtitle>
                            <Card.Text>
                              Type in the name of the layout you would like to see and click on the <FontAwesomeIcon icon={faSearch} /> button to search the list. To reset the search list click on the <FontAwesomeIcon icon={faRedo} /> button.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <br/>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={layoutOptions}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Layout Options</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">View, Edit, Duplicate & Delete</Card.Subtitle>
                            <Card.Text>
                              Click on a layout to show the Layout Options: <br/>
                              <FontAwesomeIcon icon={faEye} /> view the layout on the Page Viewer<br/>
                              <FontAwesomeIcon icon={faCopy} /> duplicate current layout<br/>
                              <FontAwesomeIcon icon={faEdit} /> edit current layout<br/>
                              <FontAwesomeIcon icon={faTrashAlt} /> delete current layout
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <br/>
                      <div style={{ display: "flex" }}>
                        <Image width={'50%'} height={'auto'} src={layoutModal}/>
                        <Card border='light' style={{ width: '50%' }}>
                          <Card.Body>
                            <Card.Title>Layout Settings</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Set Name, Pages,Labels & Etc</Card.Subtitle>
                            <Card.Text>
                              Click on the Edit, Duplicate, or Create buttons to open the Layout Settings. Change or enter the values you want for your layout.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </Row>
                  </Popover.Content>
                </Popover>:
                <Tooltip style={{opacity: '0'}}>Click to Open</Tooltip>
              }
            >
              <Accordion.Toggle
                as={Button}
                onClick={this.props.hidePopover}
                style={{
                  backgroundColor: "transparent",
                  outline: "0",
                  color: "black",
                  border: "none",
                }}
                eventKey="1"
              >
                Layouts
              </Accordion.Toggle>
            </OverlayTrigger>
          
            <Button
              style={{
                backgroundColor: "transparent",
                outline: "0",
                color: "black",
                border: "none",
              }}
              onClick={this.props.createTemplate}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Card.Header>

          <Accordion.Collapse eventKey="1">
            <Card.Body
              style={{ height: "46em", overflowY: "auto", padding: "0" }}
            >
              <Navbar sticky="top" variant="light">
                <Form inline>
                  <FormControl
                    placeholder="Type to search..."
                    onChange={(e) => this.setState({ value: e.target.value })}
                    value={this.state.value}
                  />
                  <Button
                    onClick={() => searchTemplate(this.state.value)}
                    style={{ marginLeft: "10px" }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                    <Button
                        onClick={() => searchTemplate("")}
                        style={{ marginLeft: "5px" }}
                    >
                    <FontAwesomeIcon icon={faRedo} />
                  </Button>
                </Form>
              </Navbar>
              <ListGroup variant="flush" value={this.props.tempList}>
                {this.props.tempList.map((d) => (
                  <ListGroup.Item
                    key={d.id}
                    id={d.id}
                    action
                    onClick={this.props.handleFragmentButtons}
                  >
                    {d.class_attr === null ? "No Name" : d.class_attr}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default FragmentPanel;
