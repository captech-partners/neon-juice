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


class EditFragment extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          class: "",

          dataChildLimit: "",
          dataChildType: "",
          dataID: "8",
          dataLabel: "",
          dataPage: "",

          template: "",
          content: "",

          code: ""
      };

      this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {

    var current = this;

    const url = "http://localhost:5000/fragments/" + this.state.dataID;

    axios.get(url)
      .then(function (response) {

        current.setState({
          class: response.data.class_attr,
          code: response.data.html,
          dataPage: response.data.pages,
          dataLabel: response.data.labels,
          dataID: response.data.id,
          template: response.data.templates,
        })

      })
      .catch(function (error) {
        console.log(error);
      });
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
        data: JSON.stringify({html: code}),
      });
  };


  updateCode(event) {
      this.setState({
          code: this.refs.content.value,
      });
  };


  render() {

    var options = {
          lineNumbers: true,
          lineWrapping: true,
          theme: "material-ocean",
          mode: 'xml',
      };

      return (
        <div>
          <InputFields>
              <h1 align="center">New Fragment</h1>
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
            this.state.dataChildType + "\" data-id=\""
            + this.state.dataID + "\" data-label=\"" + this.state.dataLabel + "\" data-page=\""
            + this.state.dataPage + "\" data-template=\"" + this.state.template + "\">" + this.state.content + "</div>"}
            onChange={this.updateCode} options={options}/>
          </Editor>
        </div>
      );
  }
};

export default EditFragment;
