import React, { Component } from "react";
import Iframe from "react-iframe";
import Select from "react-select/creatable";
import changeLabels from "../tutorial_assets/changeLabels.gif";
import changeView from "../tutorial_assets/changeView.gif";
import { Col, Card, Form, Row, OverlayTrigger, Tooltip, Popover, Image } from "react-bootstrap";


export class PageViewer extends Component {

  handleLabel = (e) => {
    this.props.handleLabels(e)
  };

  render() {
    var id = 0;
    var optionsLabels = [];
    this.props.labels.map((d) => optionsLabels.push({ label: d, value: d }));

    return (
      <div style={{ width: "100%", height: "100%"}}>
        <div style={{ padding: "2em", paddingBottom: "0" }}>
          <Form>
            <Form.Group as={Row}>
              <OverlayTrigger
                trigger={['focus','hover']}
                placement={'bottom-start'}
                overlay={
                  this.props.tutorialEnabled ?
                  <Popover style={{padding: '2em', maxWidth: '1500px'}}>
                    <Popover.Content>
                      <h4>Page Viewer</h4>
                      <br/>
                      <Row>
                        <Col>
                          <div style={{ display: "flex" }}>
                            <Image width={'70%'} height={'auto'} src={changeView}/>
                            <Card border='light' style={{ width: '30%'}}>
                              <Card.Body>
                                <Card.Title>Change View</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">View, Edit, Duplicate & Delete</Card.Subtitle>
                                <Card.Text>
                                  Click on a layout to show the Layout Options: <br/>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </Col>
                        
                        <Col>
                          <div style={{ display: "flex" }}>
                            <Image width={'70%'} height={'auto'} src={changeLabels}/>
                            <Card border='light' style={{ width: '30%' }}>
                              <Card.Body>
                                <Card.Title>Change Path & Labels</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">View, Edit, Duplicate & Delete</Card.Subtitle>
                                <Card.Text>
                                  Click on a layout to show the Layout Options: <br/>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                      
                    </Popover.Content>
                  </Popover> :
                  <Tooltip style={{opacity: '0'}}>Current Layout</Tooltip>
                }
              >
                <Col>
                  <h2 style={{textAlign: "left"}}>{this.props.templateName}</h2>
                </Col>
              </OverlayTrigger>
              
              <Form.Label>Path</Form.Label>
              <Col md={"auto"}>
                <Form.Control
                  as="select"
                  value={this.props.currentPage}
                  onChange={(e) => this.props.handlePage(e.target.value)}
                >
                  {this.props.pages.map((d) => (
                    <option key={id++} value={d}>
                      {d}
                    </option>
                  ))}
                </Form.Control>
              </Col>

              <Form.Label>Labels</Form.Label>
              <Col md={"auto"}>
                <OverlayTrigger
                  overlay={<Tooltip>Queries for website page path</Tooltip>}
                >
                  <Select 
                    value={this.props.default}  
                    onChange={this.handleLabel} 
                    isClearable={false}
                    isMulti options={optionsLabels} 
                  />
                  
                </OverlayTrigger>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <Iframe
          url={"http://localhost:5000/" + this.props.currentPage + "?label=" + this.props.currentLabel}
          width="100%"
          height="770vh"
          display="initial"
          position="relative"
          styles={{ position: "fixed" }}
          allowFullScreen
          frameBorder={"0"}
        />
      </div>
    );
  }
}
export default PageViewer;
