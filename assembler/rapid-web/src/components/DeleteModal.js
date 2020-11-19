import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class DeleteModal extends Component {
  deleteFrag = () => {
    this.props.toggle();
    const url = `http://localhost:5000/fragments/` + this.props.fragment.id;
    axios.delete(url).then((result) => {
      console.log(result);
      this.props.updateList();
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  render() {
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>
            <Row>
              <Col md={'auto'}>
                <FontAwesomeIcon 
                  icon={faExclamationTriangle}
                  style={{marginLeft: '1vh'}}
                />
              </Col>
              <Col>
              Warning: No Backup for {this.props.fragment.class_attr}
              </Col>
            </Row>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This fragment will be permanently deleted, unless previously duplicated.
          Are you sure you want to delete this fragment?
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={this.deleteFrag}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DeleteModal;
