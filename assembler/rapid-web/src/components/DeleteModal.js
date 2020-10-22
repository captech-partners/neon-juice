import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title>
            Warning: No Backup for fragment: <br />
            {this.props.value}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This fragment will be forever deleted, unless previously duplicated,
          are you sure you want to delete this fragment?
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="secondary" onClick={this.props.toggleAction}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={this.props.deleteAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DeleteModal;
