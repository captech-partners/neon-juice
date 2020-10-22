import React, { Component } from "react";
import { Button, Accordion, Card, ListGroup, OverlayTrigger, Tooltip, FormControl, Navbar, Form } from "react-bootstrap";
import { faPlus, faSearch, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <OverlayTrigger overlay={<Tooltip>Create a new component</Tooltip>}>
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
            </OverlayTrigger>
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
            <OverlayTrigger
              container={this.refs.here}
              overlay={<Tooltip>Create a new layout</Tooltip>}
            >
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
            </OverlayTrigger>
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
