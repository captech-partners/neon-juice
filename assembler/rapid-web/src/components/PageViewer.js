import React, { Component } from "react";
import Iframe from "react-iframe";
import Select from "react-select";
import changeLabels from "../tutorial_assets/changeLabels.gif";
import changeView from "../tutorial_assets/changeView.gif";
import { Button, Col, Card, Form, Row, OverlayTrigger, Tooltip, Popover, Image } from "react-bootstrap";


export class PageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageValue: props.currentPage,
      labelValue: props.currentLabel,
      tutorialEnabled: props.tutorialEnabled,
      url: props.url
    };
  }

  componentWillReceiveProps(newProps){
    var newUrl =
      "http://localhost:5000/" +
      newProps.currentPage +
      "?label=" +
      newProps.currentLabel;
    this.setState({
      pageValue: newProps.currentPage,
      labelValue: newProps.currentLabel,
      url: newUrl
    })
  }

  handlePage = (e) => {
    this.setState({
      pageValue: e.target.value,
    });
  };

  handleLabel = (e) => {
    var values = e === null ? "" : e.map(d => d.value)
    this.setState({
      labelValue: values,
    }) 
  };

  changeUrl = () => {
    var newUrl =
      "http://localhost:5000/" +
      this.state.pageValue +
      "?label=" +
      this.state.labelValue;
    this.setState({
      url: newUrl,
    });
  };

  render() {
    var id = 0;
    var optionsLabels = [];
    this.props.labels.map((d) => optionsLabels.push({ label: d, value: d }));

    return (
      <div style={{ width: "100%" }}>
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
                  <h2>{this.props.templateName}</h2>
                </Col>
              </OverlayTrigger>
              
              <Form.Label>Path</Form.Label>
              <Col md={"auto"}>
                <OverlayTrigger
                  overlay={<Tooltip>Paths for the website pages</Tooltip>}
                >
                  <Form.Control
                    as="select"
                    value={this.state.pageValue}
                    onChange={this.handlePage}
                  >
                    {this.props.pages.map((d) => (
                      <option key={id++} value={d}>
                        {d}
                      </option>
                    ))}
                  </Form.Control>
                </OverlayTrigger>
              </Col>

              <Form.Label>Labels</Form.Label>
              <Col md={"auto"}>
                <OverlayTrigger
                  overlay={<Tooltip>Queries for website page path</Tooltip>}
                >
                  <Select 
                    defaultValue={this.props.default}  
                    onChange={this.handleLabel} 
                    isClearable={false}
                    isMulti options={optionsLabels} 
                  />
                  
                </OverlayTrigger>
              </Col>
              <Button onClick={this.changeUrl}>View</Button>
            </Form.Group>
          </Form>
        </div>
        <Iframe
          url={this.state.url}
          width="100%"
          height="770vh"
          display="initial"
          position="relative"
          style={{ position: "fixed" }}
          allowFullScreen
          frameBorder={"0"}
        />
      </div>
    );
  }
}
export default PageViewer;
