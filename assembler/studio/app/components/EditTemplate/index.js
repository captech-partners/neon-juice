import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

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

class EditTemplate extends React.Component {

   constructor (props) {
      super(props);
      this.state = {
          class: "",
          content: "",

          dataChild: "",
          dataPage: "",
          dataLabel: "",
          dataID: "",

          dataChildClass: "",
          dataChildLimit: 0,
          dataChildType: "",

          code: "",
          editorText: "",
          showEditor: true
      };

      this.updateCode = this.updateCode.bind(this);

      this.inputDataChildClass = React.createRef();
      this.inputDataChildLimit = React.createRef();
      this.inputDataChildType = React.createRef();

      this.toggleEditor = this.toggleEditor.bind(this);
    }

    componentDidMount() {

      var current = this;

      const { givenDataID } = this.props.location.state;
      this.setState({dataID: givenDataID},

        function () {
          const url = "http://localhost:5000/fragments/" + this.state.dataID;

          axios.get(url)
            .then(function (response) {

              current.setState({
                class: (response.data.class_attr != "null") ? response.data.class_attr : "",
                code: response.data.html,
                dataPage: response.data.pages,
                dataLabel: response.data.labels,
                dataID: response.data.id
              })
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    }

    componentDidUpdate() {
      var current = this;

      if(this.props.location.state.givenDataID !== this.state.dataID){
        const { givenDataID } = this.props.location.state;
        this.setState({dataID: givenDataID},

          function () {
            const url = "http://localhost:5000/fragments/" + this.state.dataID;

            axios.get(url)
              .then(function (response) {

                current.setState({
                  class: (response.data.class_attr != "null") ? response.data.class_attr : "",
                  code: response.data.html,
                  dataPage: response.data.pages,
                  dataLabel: response.data.labels,
                  dataID: response.data.id
                })
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      }
    }

    /* Handle changes to the input boxes */
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

   /* Save Template */
   onSubmit = e => {
      e.preventDefault();
      console.log(this.state);

      let data = JSON.stringify({
        html: this.state.code
      });

      console.log("content: " + data);


      const url = "http://localhost:5000/fragments/" + this.state.dataID;
        console.log("url: " + url);

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios.put(url, data, axiosConfig)
      .then(function (response) {
        // current.setState({toEdit: true});
        console.log("success");
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    /* Handle changes to the codemirror HTML editor */
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

    /* Handle submitting a fragment slot */
    onAddSlot = e => {
      e.preventDefault();

      this.setState((state, props) => ({
        dataChildClass: this.inputDataChildClass.current.value,
        dataChildLimit: this.inputDataChildLimit.current.value,
        dataChildType: this.inputDataChildType.current.value,

        content: state.content + "<div class=\"" + this.inputDataChildClass.current.value +
          "\" data-child-limit=\"" + this.inputDataChildLimit.current.value +
          "\" data-child-type=\"" + this.inputDataChildType.current.value + "\"></div>"
      }));
    };

    /* Switch between HTML editor or Preview */
    toggleEditor(){
      this.setState((state, props) => ({
        showEditor: !state.showEditor,
      }));
    };

    render() {

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
            <h1>Edit Template: {this.state.class}</h1>

            <InputFields>
              <form>
                <p>Template Name:
                    <input
                        size="30"
                        name="class"
                        placeholder="Template Name"
                        value={this.state.class ? this.state.class : "null"}
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
              </form>

              <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={this.state.content}
                onChange={(content, delta, source, editor) => {
                  this.setState({
                    content: content,
                  }, this.updateCode)
                }} ref="content"/>

              <Button style={{marginBottom: "1em", marginTop:"1em"}}
                variant="success"
                size="sm"
                onClick={e => this.onSubmit(e)}>Save Template</Button>

              <h2>Fragment Slot:</h2>
              <form>
                <p>Class:
                    <input
                        name="class"
                        placeholder="Class"
                        defaultValue={this.state.class}
                        ref={this.inputDataChildClass}
                    />
                </p>
                <p>Data Child Limit:
                    <input
                        name="dataChildLimit"
                        placeholder="Data Child Limit"
                        type="number"
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
                <Button variant="success" size="sm" onClick={e => this.onAddSlot(e)}>Add Template Slot</Button>
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

                  <CodeMirror value={
                    "<html data-id=\"\" data-label=\""
                    + this.state.dataLabel +
                    "\" data-page=\""
                    + this.state.dataPage +
                    "\"><head><meta content=\"text/html\; charset=utf-8\" http-equiv=\"Content-Type\"><title></title><style></style></head><body>"
                      + this.state.content +
                      "</body></html>"}
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

export default EditTemplate;
