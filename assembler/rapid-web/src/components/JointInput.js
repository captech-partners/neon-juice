import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class JointInput extends Component {
  render() {
    return (
        <Form.Group as={Row}>
          <Col style={{marginRight: "0", paddingRight: '0'}}>
            <Select isMulti isClearable={false} defaultValue={this.props.defaultValue} options={this.props.options} />
          </Col>
          <Col md={'auto'}>
            <Button className="popButton" onClick={this.props.onDelete}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Col>
        </Form.Group>
    )
  }
}
export default JointInput;
