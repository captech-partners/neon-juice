import React, { Component } from "react";
import edit from "../tutorial_assets/editing.gif";
import view from "../tutorial_assets/viewpage.gif";
import { Modal, Carousel, Row, Col } from "react-bootstrap";

class TutorialInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      showCreateInstructions: false,
      showEditInstructions: false,
      showChangeTemplateInstructions: false,
      showPageViewerInstruction: false
    };
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
      showCreateInstructions: true
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          size={"xl"}
          onHide={this.toggleShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h2 style={{ margin: "0 auto" }}>
              Welcome to Rapid Website Creation
            </h2>
          </Modal.Header>

          <Modal.Body>
            <Carousel
              style={{ margin: "2em", marginTop: "0px" }}
              interval={15000}
            >
              <Carousel.Item>
                <Row>
                  <Col md={8}>
                    <img className="d-block w-100" src={edit} alt="editing" />
                  </Col>
                  <Col>
                    <br />
                    <h5>Create & Customize Website Components</h5>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Col>
                </Row>
              </Carousel.Item>

              <Carousel.Item>
                <Row>
                  <Col md={8}>
                    <img className="d-block w-100" src={view} alt="viewing" />
                  </Col>
                  <Col>
                    <br />
                    <h5>View Updated Content</h5>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
            <Modal.Footer style={{ border: "none" }}></Modal.Footer>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default TutorialInterface;
