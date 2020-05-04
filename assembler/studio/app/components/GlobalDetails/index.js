import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const Main = styled.div`
  margin-top: 1em;
  padding-left: .5em;
`

const InputFields = styled.div`
  width: 30%;
  height: 700px;
  left: 0;
  bottom: 0;
  float: left;
  padding: 1em;
  padding-top: 2em;
  margin-right: 1em;
  margin-bottom: 1em;
  background-color: #f7f8f9;
`;

class GlobalDetails extends React.Component {

  constructor (props) {
    super(props);
    this.state = {value: '', toStudio: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  onExport = e => {
  };

  goToStudio = e => {
  this.setState({toStudio: true});

  };

  render() {

        if(this.state.toStudio === true) {
        return <Redirect to={{
            pathname: `/studio`,
          }}
        />
      };

        /* Codemirror options */
      var options = {
            lineNumbers: true,
            lineWrapping: true,
            theme: "material-ocean",
            mode: 'xml',
        };

    return(
      <div>
        <InputFields>
      <form onSubmit={this.handleSubmit}>
        <label>
          Project Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
          <br/>
          <Button variant="info" onClick={e => this.goToStudio(e)}>Go To Studio</Button>
          <br/>
          <br/>
          <Button variant="success" onClick={e => this.onExport(e)}>Export</Button>
        </InputFields>

        <Main>
                <h2>Styling</h2>
                <CodeMirror value="
            html {
              width: 100%;
              height: 100%;
              padding: 0px;
              margin: 0px;
          }

          body {
              width: 100%;
              height: 100%;
              padding: 0px;
              margin: 0px;
              margin: 0px;
              background-color: #f5f4f2;
          }

          h1 {
              font-size: 1.5em;
              font-weight: bold;
              line-height: 0.5em;
              color: #0e3368;
          }

          h2 {
              font-size: 2.5em;
              line-height: 0.5em;
              color: #0e3368;
          }

          h3 {
              line-height: 0.1em;
              margin: 0px;
              margin-top: 7px;
              padding: 0px;
              color: #0e3368;
          }

          img {
              max-width: 100%;
              max-height: 100%;
          }

          .header {
              width: 100%;
              border-bottom: solid 1px #ccc;
              background-color: #fff;
          }

          .cart {
              display: inline-block;
              float: right;
              font-size: 1.8em;
              padding: 10px;
          }

          .cart:hover {
              color: #db3832;
              cursor: pointer;
          }

          .nav {
              width: 100%;
              display: inline-block;
          }

          .nav-left {
              float: left;
              display: inline-block;
              padding: 0 10px 10px 10px;
          }

          .nav-right {
              float: right;
              display: inline-block;
              padding: 0 10px 10px 10px;
          }

          .nav-element {
              display: inline-block;
              font-size: 1.2em;
              cursor: pointer;
              margin-right: 10px;
          }

          .nav-element:hover {
              color: #db3832;
              cursor: pointer;
          }

          .content {
              width: 100%;
              text-align: center;
          }

          .panel-top {
              width: 90%;
              max-width: 1190px;
              background-color: #fff;
              border-radius: 10px;
              display: inline-block;
              margin-top: 20px;
          }

          .panel-content {
              display: inline-block;
              width: 19.6%;
              vertical-align: top;
              margin: 0px;
              padding-top: 25px;
              padding-bottom: 25px;
              border-right: #f5f4f2 1px solid;
          }

          .panel-content:hover {
              color: #db3832;
              cursor: pointer;
          }

          .panel-icon {
              font-size: 2em;
          }

          .panel-main {
              width: 90%;
              display: inline-block;
              margin-top: 20px;
          }

          .panel-main-left {
              width: 590px;
              display: inline-block;
              margin: 0px;
              margin-right: 6px;
              padding: 0px;
              vertical-align: top;
              margin-bottom: 10px;
          }

          .panel-main-right {
              width: 590px;
              display: inline-block;
              margin: 0px;
              padding: 0px;
              vertical-align: top;
          }

          .panel-main-right-box {
              width: 290px;
              border: solid 1px #ccc;
              height: 189px;
              background-color: #fff;
              border-radius: 5px;
              display: inline-block;
              text-align: left;
              vertical-align: top;
              margin-bottom: 5px;
          }

          .panel-main-right-box:hover {
              border: solid 1px #db3832;
              cursor: pointer;
          }

          .panel-main-left-content {
              text-align: left;
              background-color: #fff;
              border: solid 1px #ccc;
              border-radius: 5px;
              overflow: hidden;
          }

          .panel-main-left-content:hover {
              border: solid 1px #db3832;
              cursor: pointer;
          }

          .content-details {
              padding: 10px;
          }

          .panel-special {
              width: 90%;
              max-width: 1190px;
              display: inline-block;
          }

          .panel-special-content {
              display: inline-block;
              width: 100%;
              text-align: left;
          }

          .special-wrapper {
              width: 100%;
              max-width: 1190px;
          }

          .special-item {
              width: 184px;
              height: 140px;
              border: solid 1px #095ba5;
              border-radius: 5px;
              margin-right: 11px;
              margin-bottom: 10px;
              display: inline-block;
              text-align: center;
              vertical-align: top;
              background-color: #fff;
              overflow: hidden;
          }

          .special-item:hover {
              border: solid 1px #db3832;
              cursor: pointer;
          }

          .special-image {
              width: 100px;
          }"
        
        onChange={this.handleChange} options={options}/>
        </Main>
      </div>
    )
  }
}

export default withRouter(GlobalDetails);

