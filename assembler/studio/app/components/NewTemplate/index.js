import React from 'react';
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

const InputFields = styled.div`
  float: left;
`;

const Editor = styled.div`
  margin-top: 1em;
  margin-right: 1em;
  float: right;
  width: 40%;
`;

const Button = styled.button`
  background: #E5C1EE;
  border-radius: 3px;
  border: solid #DBB7E4;
  color: #33153A;
  font-size: .5em;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 1em;
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
            dataChildLimit: 0,
            dataChildType: "",

            code: "",
            editorText: "",

            toEdit: false,
        };

        this.updateCode = this.updateCode.bind(this);

        this.inputDataChildLimit = React.createRef();
        this.inputDataChildType = React.createRef();
    }


    /* Handle changes to the input boxes */
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


  /* Save Template and redirect to edit template page */
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
              <form>
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
              </form>

              <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={this.state.content}
                onChange={(content, delta, source, editor) => {
                  this.setState({
                    content: content,
                  })
                }} ref="content"/>

              <Button onClick={e => this.onSubmit(e)}>Create Template</Button>

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
                  <Button onClick={e => this.onAddSlot(e)}>Add Template Slot</Button>
                </form>

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


// <p>Content:
//     <input
//         name="content"
//         placeholder="Content"
//         value={this.state.content}
//         onChange={e => this.change(e)}
//
//         ref="content"
//     />
// </p>


export default NewTemplate;
