import React, { Component } from "react";
import { Button, Jumbotron, Navbar, Carousel, Row, Col} from "react-bootstrap";
import { faFontAwesome, faNpm, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import exp1 from "../tutorial_assets/example1.png";
import exp2 from "../tutorial_assets/example2.png";
import exp3 from "../tutorial_assets/example3.png";
import exp4 from "../tutorial_assets/example4.png";
import exp5 from "../tutorial_assets/example5.png";
import custom from "../tutorial_assets/customcreation.gif";
import dynamic from "../tutorial_assets/dynamic.gif";
import Font, {Text} from 'react-font'


export class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  continue = (e) => {
    this.props.nextStep();
  };

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className="StartPage" style={{ width: "100%", height: "100%" }}>
        <Navbar
          style={{
            background: "none",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <Navbar.Brand>Rapid Website Creation Studio</Navbar.Brand>
        </Navbar>

        <Jumbotron fluid style={{ padding: "auto", paddingTop: "23em", paddingBottom: "20em", marginBottom: "0" }}>
          <div style={{margin: "auto"}}>
            <Text family="Vollkorn" style={{ fontSize: 40 }}>
              Rapid Website Creation Studio
            </Text>
            <div className="StartButtons">
              <Button
                variant="secondary"
                style={{ marginTop: "2em", marginBottom: "3em" }}
                onClick={this.continue}
              >
                Start New Project
              </Button>
            </div>
          </div>
        </Jumbotron>

        <div className="section" style={{marginTop: "10em", height: "70em", color: "#333333"}}>
          <Font family="EB Garamond">
            <h2 style={{margin: "4em",marginTop: "8em", fontSize: "56px"}}>Create Websites Without Coding Experience</h2>
          </Font>
          <br/>

          <div style={{ margin: "auto"}}>
            <div class="laptop">
              <div class="content">
                <Carousel>
                  <Carousel.Item>
                    <img className="d-block w-100" src={exp1} alt="viewing" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={exp2} alt="viewing" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={exp3} alt="viewing" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={exp4} alt="viewing" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={exp5} alt="viewing" />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
            <hr style={{height: "70em",width: "3px", backgroundColor: "#d4d4d4"}}></hr>
          </div>
        </div>
        
        <div className="section" style={{marginTop: "20em"}}>
          <div style={{ padding: "8em", textAlign: "center", color: "#333333" }}>
            <Font family="EB Garamond">
              <h2 style={{fontSize: "56px"}}>Create Nested Customizable Components</h2>
            </Font>
            <div className="container" style={{marginTop:"8em"}}>
             <Row>
               <Col>
               <br/>
                  <figure>
                    <img src={custom} alt="viewing"/>
                  </figure>
               </Col>
               <Col style={{marginLeft: "1em"}}>
                  <Font family="Nanum Gothic">
                    <p style={{fontSize: "28px", textAlign: "left", lineHeight: "60px"}}>Eight premade components are available for non-technical users.<br/> <br/>
                    Each component can be inserted into a layout or another component.</p>
                  </Font>
               </Col>
             </Row>
            </div>
          </div>
        </div>

        <hr style={{position: "relative", top: "-1em", height: "30em",width: "3px", backgroundColor: "#d4d4d4"}}></hr>
        
        <div className="section">
          <div style={{ padding: "10em", textAlign: "center", color: "#333333" }}>
            <Font family="EB Garamond">
              <h2 style={{fontSize: "56px"}}>Dynamically Render Website Layouts</h2>
            </Font>
            <div style={{marginTop:"8em"}}>
             <Row>
               <Col md={5}>
                 <div style={{height: "100%", paddingTop: "12em"}}>
                    <Font family="Nanum Gothic">
                      <p style={{fontSize: "28px", textAlign: "left", lineHeight: "60px"}}>Change the layout of your website with descriptive tags.</p>
                    </Font>
                 </div> 
               </Col>

               <Col>
                  <figure>
                    <img src={dynamic} alt="viewing" width="100%"/>
                  </figure>
               </Col>
             </Row>
            </div>
          </div>
        </div>

        <hr style={{position: "relative", bottom: "-1em", height: "30em",width: "3px", backgroundColor: "#d4d4d4"}}></hr>

        <div className="section">
          <div style={{ padding: "10em", textAlign: "center", color: "#333333" }}>
            <Font family="EB Garamond">
              <h2 style={{fontSize: "56px"}}>Design Unique Web Experience</h2>
            </Font>
          </div>
        </div>

        <hr style={{position: "relative", top: "-1em",height: "30em",width: "3px", backgroundColor: "#d4d4d4"}}></hr>

        <div className="section">
          <div style={{ padding: "10em", paddingTop: 0,textAlign: "center", color: "#6a6a6a" }}>
            <Font family="Vollkorn">
              <h5>Created With</h5>
            </Font>
            <Row style={{margin: "auto", position: "relative", width: "15em" }}>
              <FontAwesomeIcon icon={faReact} style={{height: "3em", width: "auto", margin: "1em"}}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faNpm} style={{height: "3em", width: "auto", margin: "1em"}}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faFontAwesome} style={{height: "3em", width: "auto", margin: "1em"}}></FontAwesomeIcon>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default StartPage;
