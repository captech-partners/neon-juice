import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

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

        var code = this.state.code;

        axios({
          method: 'post',
          url: 'http://localhost:5000/fragments',
          dataType: "json",
    			contentType:"application/json",
    			// data: JSON.stringify({html: code}),
          data: "html: " + code
        })
        .then(function() {
          this.setState({toEdit: true});
        })
        .catch(function (error) {
          console.log(error);
        });
    };


    updateCode(event) {
      this.setState({
          code: "<div class=\"" +
          this.state.class + "\" data-id=\"" +
          this.state.dataID + "\" data-label=\"" +
          this.state.dataLabel + "\" data-page=\"" +
          this.state.dataPage + "\" data-template=\"" +
          this.state.template + "\">\n\t" +
          this.state.content + "\n</div>\n\t"
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
                <p>Data Child Limit:
                    <input
                        name="dataChildLimit"
                        placeholder="Data Child Limit"
                        value={this.state.dataChildLimit}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Data Child Type:
                    <input
                        name="dataChildType"
                        placeholder="Data Child Type"
                        value={this.state.dataChildType}
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
              <CodeMirror value={"<div class=\"" + this.state.class + "\" data-child-limit=\"" + this.state.dataChildLimit
              + "\" data-child-type=\"" +
              this.state.dataChildType + "\" data-id=\"\" data-label=\"" + this.state.dataLabel + "\" data-page=\""
              + this.state.dataPage + "\" data-template=\"" + this.state.template + "\">" + this.state.content + "</div>"}
              onChange={this.updateCode} options={options}/>
            </Editor>
          </div>
        );
    }
};

export default withRouter(NewFragment);
