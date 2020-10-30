import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class DeleteModal extends Component {
  deleteFrag = () => {
    this.props.toggle();
    const url = `http://localhost:5000/fragments/` + this.props.fragment.id;
    axios
      .delete(url)
      .then((result) => {
        console.log(result);
        this.props.updateList(this.props.fragment.id);
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
            Warning: No Backup for fragment: <br />
            {this.props.fragment.class_attr}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This fragment will be forever deleted, unless previously duplicated,
          are you sure you want to delete this fragment?
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
