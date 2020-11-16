import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class JointInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }

  handleChange(e){
    this.setState({
      value: e
    })
  }

  render() {
    return (
      <Form.Group as={Row}>
        <Col style={{marginRight: "0", paddingRight: '0'}} md={9}>
          <Select isMulti isClearable={false} options={this.props.options} value={this.state.value} onChange={(e) => this.handleChange(e)}/>
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
