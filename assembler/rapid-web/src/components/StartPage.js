import React, { Component } from "react";
import { Button, Jumbotron, Navbar, Nav} from "react-bootstrap";
import exp1 from "../tutorial_assets/example1.png";
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
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Documentation</Nav.Link>
          </Nav>
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

        <div className="section" style={{marginTop: "10em", height: "50em"}}>
          <Text family="Vollkorn">
            <h2 style={{marginBottom: "2em", fontSize: 50, fontWeight: "bold"}}>Create Websites Without Coding Experience</h2>
          </Text>
          <br/>

          <div style={{ margin: "auto", }}>
            <div class="laptop">
              <div class="content">
                <img className="d-block w-100" src={exp1} alt="viewing" />
              </div>
            </div>
          </div>
        </div>

        <div className="section" style={{backgroundColor: "#e9ecef"}}>
          <div style={{ padding: "10em", textAlign: "left", color: "#333333" }}>
            <Font family="Vollkorn">
              <h2 style={{marginBottom: "20px"}}>Dynamically Render Website Layouts</h2>
            </Font>
            
            <Font family="Nanum Myeongjo">
              <h3 style={{ fontWeight: "light", color: "#222222" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </h3>
            </Font>
          </div>
        </div>

        <div className="section">
          <div style={{ padding: "10em", textAlign: "left", color: "#333333" }}>
            <Font family="Vollkorn">
              <h2 style={{marginBottom: "20px"}}>Create Nested Customizable Components</h2>
            </Font>
            
            <Font family="Nanum Myeongjo">
              <h3 style={{ fontWeight: "light", color: "#222222" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </h3>
            </Font>
          </div>
          
        </div>

        <div className="section" style={{backgroundColor: "#e9ecef"}}>
          <div style={{ padding: "10em", textAlign: "left", color: "#333333" }}>
            <Font family="Vollkorn">
              <h2 style={{marginBottom: "20px"}}>Design Unique Web Experience</h2>
            </Font>
            
            <Font family="Nanum Myeongjo">
              <h3 style={{ fontWeight: "light", color: "#222222" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </h3>
            </Font>
          </div>
        </div>
      </div>
    );
  }
}
export default StartPage;
