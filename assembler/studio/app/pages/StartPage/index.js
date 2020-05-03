import React, {Fragment} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage';

var JSZip = require("jszip");
var zip = new JSZip();
const path = require('path');
const axios = require('axios').default;


const Container = styled.div`
  position: relative;
  min-height: 100vh;
`

const Body = styled.div`
  padding-bottom: 5em;
`

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {toLanding: false};
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert(
      //`Selected file - ${this.fileInput.current.files[0].name}`
      console.log(this.fileInput.current.files[0]);
      zip.loadAsync(this.fileInput.current.files[0]).then(function (zip) {
        Object.keys(zip.files).forEach(function (filename) {
          if(path.extname(filename) == '.html') {
            console.log(filename);
              //zip.files[filename].async('string').then(function (data) {
                //console.log(fileData) // These are your file contents

                
                // console.log("DATA: " + data);

                // let axiosConfig = {
                //   headers: {
                //     'Content-Type': 'application/json'
                //   }
                // };

                // console.log("prepost");
                // axios.post("http://localhost:5000/fragments", data, axiosConfig)
                // .then(function (response) {
                //   // current.setState({toEdit: true});


                //   console.log("Response: " + response.data);
                // })
                // .catch(function (error) {
                //   console.log(error);
                // });

             //})
          }
          // === tests strict equality (type matches); == tests for value not type
          // console.log(filename);
          // zip.files[filename].async('string').then(function (fileData) {
          //   console.log(fileData) // These are your file contents      
          // })
        })
      })
    //);
  }

  submit = () => {
    this.setState({toLanding: true});
  }

  render() {
    if(this.state.toLanding === true) {
      return <Redirect to={{
            pathname: `/landing-page`,
          }}
        />
    };
    return (
      <Router>
        <Container>
          <Body>
            <form onSubmit={this.handleSubmit}>
              <label>
                <h1>Import Project</h1>
                <input type="file" ref={this.fileInput} />
              </label>
              <br />
              <p></p>
              <button type="submit" onClick={this.submit}>Submit</button>
            </form>

            <h2>Start New Project</h2>
            <button onClick={this.submit}>New Project</button>
          </Body>

        </Container>
      </Router>

    );
  }
}

export default withRouter(StartPage);
