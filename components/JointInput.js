import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { faTimes, faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortableHandle } from 'react-sortable-hoc';


const DragHandle = sortableHandle(() => <FontAwesomeIcon icon={faGripHorizontal} style={{width: "3em", height: "2em", margin: 0, padding: 0}}></FontAwesomeIcon>);

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
      <Form.Group as={Row} style={{width: "100%"}}>
        <Col sm={"auto"} style={{marginRight: 0, paddingRight: 0, cursor: "row-resize"}}><DragHandle/></Col>
        <Col style={{marginLeft: 0, paddingLeft: 0, marginRight: "0", paddingRight: '0'}} md={8}>
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
