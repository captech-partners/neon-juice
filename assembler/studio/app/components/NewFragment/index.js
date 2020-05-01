import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios').default;

import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const InputFields = styled.div`
  float: left;
  margin-top: 1em;
`;

const Editor = styled.div`
  margin-top: 1em;
  margin-right: 1em;
  float: right;
  width: 40%;
`;

const Preview = styled.div`
  border: 0.25em solid black;
  height: 400px;
  width: 500px;
`;

class NewFragment extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            class: "",
            dataChildLimit: 0,
            dataChildType: "",
            dataLabel: "",
            dataPage: "",
            template: "",
            content: "",

            code: "",
            editorText: "",
            showEditor: true,

            toEdit: false,
        };

        this.updateCode = this.updateCode.bind(this);

        this.inputDataChildLimit = React.createRef();
        this.inputDataChildType = React.createRef();

        this.toggleEditor = this.toggleEditor.bind(this);
    }

    /* Handle changes to the input boxes */
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    /* Save Fragment and redirect to edit fragment page */
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
        // current.setState({toEdit: true});


        console.log("Response: " + response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

   /* Handle changes to the codemirror HTML editor */
   updateCode(event) {
     this.setState((state) => ({
         code: state.editorText

          // "<div class=\"" +
          // this.state.class + "\" data-child-limit=\"" +
          // this.state.dataChildLimit + "\" data-child-type=\"" +
          // this.state.dataChildType + "\" data-label=\"" +
          // this.state.dataLabel + "\" data-page=\"" +
          // this.state.dataPage + "\" data-template=\"" +
          // this.state.template + "\">" +
          // this.state.content + "</div>"
      }));
    };

    /* Handle submitting a fragment slot */
    onAddSlot = e => {
      e.preventDefault();

      this.setState({
        dataChildLimit: this.inputDataChildLimit.current.value,
        dataChildType: this.inputDataChildType.current.value
      });
    };

    /* Switch between HTML editor or Preview */
    toggleEditor(){
      this.setState((state, props) => ({
        showEditor: !state.showEditor,
      }));
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
      };

      /* React Quill editor options*/
      var modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      };

      var formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];

      /* Codemirror options */
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
            <form>
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

            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={this.state.content}
              onChange={(content, delta, source, editor) => {
                this.setState({
                  content: content,
                }, this.updateCode)
              }} ref="content"/>
            </form>

            <Button style={{marginBottom: "1em", marginTop:"1em"}}
              variant="success"
              size="sm"
              onClick={e => this.onSubmit(e)}>Create Fragment
            </Button>

            <h2>Fragment Slot:</h2>
            <form>
                <p>Data Child Limit:
                    <input
                        name="dataChildLimit"
                        type="number"
                        placeholder="Data Child Limit"
                        defaultValue=""
                        ref={this.inputDataChildLimit}
                    />
                </p>
                <p>Data Child Type:
                    <input
                        name="dataChildType"
                        placeholder="Data Child Type"
                        defaultValue={this.state.dataChildType}
                        ref={this.inputDataChildType}
                    />
                </p>
                <Button variant="success" size="sm" onClick={e => this.onAddSlot(e)}>Add Fragment Slot</Button>
              </form>
          </InputFields>

          <Editor>
            {this.state.showEditor &&
              <>
                <Button style={{marginBottom: "1em"}}
                  variant="outline-primary"
                  size="sm"
                  onClick={this.toggleEditor}>Show Preview
                </Button>

                <CodeMirror value={"<div class=\"" +
                this.state.class + "\" data-child-limit=\"" +
                this.state.dataChildLimit + "\" data-child-type=\"" +
                this.state.dataChildType + "\" data-label=\"" +
                this.state.dataLabel + "\" data-page=\"" +
                this.state.dataPage + "\" data-template=\"" +
                this.state.template + "\">" +
                this.state.content + "</div>"}

                onChange={(editor, data, value) => {
                    this.setState({
                      editorText: value,
                    }, this.updateCode)
                  }} options={options}/>
              </>
            }

            {!this.state.showEditor &&
              <>
                <Button style={{marginBottom: "1em"}}
                  variant="outline-primary"
                  size="sm"
                  onClick={this.toggleEditor}>Show HTML Editor
                </Button>
                <Fragment><Preview dangerouslySetInnerHTML={{ __html: this.state.code }} /></Fragment>
              </>
            }
          </Editor>
        </div>
      );
    }
};

export default withRouter(NewFragment);
