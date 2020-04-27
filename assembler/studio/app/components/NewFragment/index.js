import React from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios').default;

import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


import styled from 'styled-components';

const InputFields = styled.form`
  float: left;
`;

const Editor = styled.div`
  margin-top: 1em;
  margin-right: 1em;
  float: right;
  width: 45%;
`;

const Button = styled.button`
  background: #E5C1EE;
  border-radius: 3px;
  border: solid #DBB7E4;
  color: #33153A;
  font-size: .5em;
  margin: 0 1em;
  padding: 0.25em 1em;
`


class NewFragment extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            class: "",
            dataChildLimit: "",
            dataChildType: "",
            dataLabel: "",
            dataPage: "",
            template: "",
            content: "",

            code: "",
            editorText: "",

            toEdit: false,
        };

        this.updateCode = this.updateCode.bind(this);
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);

        var current = this;

        let data = JSON.stringify({
          html: this.state.editorText
        });

        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        axios.post("http://localhost:5000/fragments", data, axiosConfig)
        .then(function (response) {
          current.setState({toEdit: true});
        })
        .catch(function (error) {
          console.log(error);
        });
    };


    updateCode(event) {
      this.setState({
          code: "\"<div class=\"" +
          this.state.class + "\" data-id=\"\" data-label=\"" +
          this.state.dataLabel + "\" data-page=\"" +
          this.state.dataPage + "\" data-template=\"" +
          this.state.template + "\">" +
          this.state.content + "</div>\""
      });
    };


    render() {

      if(this.state.toEdit === true) {
        return <Redirect to={{
            pathname: `/edit-fragment/${this.state.dataID}`,
            state: {
              givenDataID: this.state.dataID
            }
          }}
        />
      }

      var options = {
            lineNumbers: true,
            lineWrapping: true,
            theme: "material-ocean",
            mode: 'xml',
        };

        return (
          <div>

            <h1>New Fragment</h1>

            <InputFields>
                <p>Fragment Name:
                    <input
                        name="class"
                        placeholder="Fragment Name"
                        value={this.state.class}
                        onChange={e => this.change(e)}
                    />
                </p>


                <p>Data Label:
                    <input
                        name="dataLabel"
                        placeholder="Data Label"
                        value={this.state.dataLabel}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Data Page:
                    <input
                        name="dataPage"
                        placeholder="Data Page"
                        value={this.state.dataPage}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Template:
                    <input
                        name="template"
                        placeholder="Template"
                        value={this.state.template}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Content:
                    <input
                        name="content"
                        placeholder="Content"
                        value={this.state.content}
                        onChange={e => this.change(e)}

                        ref="content"
                    />
                </p>
                <Button onClick={e => this.onSubmit(e)}>Create Fragment</Button>
            </InputFields>

            <Editor>
              <CodeMirror value={"<div class=\"" + this.state.class + "\" data-label=\"" + this.state.dataLabel + "\" data-page=\""
              + this.state.dataPage + "\" data-template=\"" + this.state.template + "\">" + this.state.content + "</div>"}
              onChange={(editor, data, value) => {
                  this.setState({
                    editorText: value,
                  }, this.updateCode)
                }} options={options}/>
            </Editor>
          </div>
        );
    }
};



// data-child-limit=\"" + this.state.dataChildLimit
// + "\" data-child-type=\"" +
// this.state.dataChildType + "\" data-id=\"\"

// <p>Data Child Limit:
//     <input
//         name="dataChildLimit"
//         placeholder="Data Child Limit"
//         value={this.state.dataChildLimit}
//         onChange={e => this.change(e)}
//     />
// </p>
// <p>Data Child Type:
//     <input
//         name="dataChildType"
//         placeholder="Data Child Type"
//         value={this.state.dataChildType}
//         onChange={e => this.change(e)}
//     />
// </p>

export default withRouter(NewFragment);
