import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

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


class NewTemplate extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            templateName: "",
            content: "",

            dataChild: "",
            dataPage: "",
            dataLabel: "",
            dataID: "",

            dataChildClass: "",
            dataChildLimit: "",
            dataChildType: "",

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

      var code = this.state.code;

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
        code: "<html data-id=\"\" data-label=\""
        + this.state.dataLabel +
        "\" data-page=\""
        + this.state.dataPage +
        "\"><head><meta content=\"text/html\; charset=utf-8\" http-equiv=\"Content-Type\"><title></title><style></style></head><body>"
          + this.state.content +
          "</body></html>"
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
            <h1>New Template</h1>

            <InputFields>
                <p>Template Name:
                    <input
                        size="30"
                        name="templateName"
                        placeholder="Template Name"
                        value={this.state.templateName}
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
                <p>Content:
                    <input
                        name="content"
                        placeholder="Content"
                        value={this.state.content}
                        onChange={e => this.change(e)}

                        ref="content"
                    />
                </p>
                <Button onClick={e => this.onSubmit(e)}>Create Template</Button>
            </InputFields>


            <Editor>
              <CodeMirror value={
                "<html data-id=\"\" data-label=\""
                + this.state.dataLabel +
                "\" data-page=\""
                + this.state.dataPage +
                "\"><head><meta content=\"text/html\; charset=utf-8\" http-equiv=\"Content-Type\"><title></title><style></style></head><body>"
                  + this.state.content +
                  "</body></html>"
                }
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

// <h2>Fragment Slot</h2>
// <p>Data Child Class:
//     <input
//         name="dataChildClass"
//         placeholder="Data Child Class"
//         value={this.state.dataChildClass}
//         onChange={e => this.change(e)}
//     />
// </p>
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

export default NewTemplate;
