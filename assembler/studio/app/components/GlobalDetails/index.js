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
          <Button variant="primary" onClick={e => this.onExport(e)}>Export</Button>
          <Button variant="primary" onClick={e => this.goToStudio(e)}>Go To Studio</Button>
        </InputFields>

        <Main>
                <CodeMirror value={"<div> </div>"}
                onChange={this.handleChange} options={options}/>
        </Main>
      </div>
    )
  }
}

export default withRouter(GlobalDetails);

