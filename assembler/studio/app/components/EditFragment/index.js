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


import Iframe from 'react-iframe'



import styled from 'styled-components';

const InputFields = styled.div`
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
  margin-top: 1em;
`


class EditFragment extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          class: "",

          dataChildLimit: "",
          dataChildType: "",
          dataID: "",
          dataLabel: "",
          dataPage: "",

          template: "",
          content: "",

          code: "",
          editorText: ""
      };

      this.updateCode = this.updateCode.bind(this);


      this.inputDataChildLimit = React.createRef();
      this.inputDataChildType = React.createRef();
  }

  componentDidMount() {

    var current = this;

    const { givenDataID } = this.props.location.state;
    this.setState({dataID: givenDataID},

      function() {
        const url = "http://localhost:5000/fragments/" + this.state.dataID;

        axios.get(url)
          .then(function (response) {

            let parsedContent = response.data.html.substring(response.data.html.indexOf(">\n\t") + 1, response.data.html.lastIndexOf("</div>"));

            current.setState({
              class: response.data.class_attr,
              code: response.data.html,
              dataPage: response.data.pages,
              dataLabel: response.data.labels,
              template: response.data.templates,
              content: parsedContent,
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
                class: response.data.class_attr,
                code: response.data.html,
                dataPage: response.data.pages,
                dataLabel: response.data.labels,
                template: response.data.templates,
                dataID: response.data.id
              })

            })
            .catch(function (error) {
              console.log(error);
            });
        });
    }
  }

  change = e => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  onSubmit = e => {
      e.preventDefault();
      console.log(this.state);

      let data = JSON.stringify({
        html: this.state.editorText
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
        console.log("success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  updateCode(event) {
      this.setState({
          code: "<div class=\"" +
          this.state.class + "\" data-child-limit=\"" +
          this.state.dataChildLimit + "\" data-child-type=\"" +
          this.state.dataChildType + "\" data-id=\"" +
          this.state.dataID + "\" data-label=\"" +
          this.state.dataLabel + "\" data-page=\"" +
          this.state.dataPage + "\" data-template=\"" +
          this.state.template + "\">" +
          this.state.content + "</div>"
      });
  };


  onAddSlot = e => {
    e.preventDefault();

    this.setState({
      dataChildLimit: this.inputDataChildLimit.current.value,
      dataChildType: this.inputDataChildType.current.value
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
          <h1>Edit Fragment: {this.state.class}</h1>

          <InputFields>
            <form>
              <p>Fragment Name:
                  <input
                      name="class"
                      placeholder="Fragment Name"
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
              <p>Template:
                  <input
                      name="template"
                      placeholder="Template"
                      value={this.state.template}
                      onChange={e => this.change(e)}
                  />
              </p>
            </form>

            <ReactQuill theme="snow" value={this.state.content} onChange={(content, delta, source, editor) => {
                this.setState({
                  content: content,
                })
              }} ref="content"/>

            <Button onClick={e => this.onSubmit(e)}>Save Fragment</Button>

            <h2>Fragment Slot:</h2>
            <form>
              <p>Data Child Limit:
                  <input
                      name="dataChildLimit"
                      placeholder="Data Child Limit"
                      defaultValue={this.state.dataChildLimit}
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
              <Button onClick={e => this.onAddSlot(e)}>Add Fragment Slot</Button>
            </form>

          </InputFields>



          <Editor>
            <CodeMirror value={"<div class=\"" +
            this.state.class + "\" data-child-limit=\"" +
            this.state.dataChildLimit + "\" data-child-type=\"" +
            this.state.dataChildType + "\" data-id=\"" +
            this.state.dataID + "\" data-label=\"" +
            this.state.dataLabel + "\" data-page=\"" +
            this.state.dataPage + "\" data-template=\"" +
            this.state.template + "\">" +
            this.state.content + "</div>"}
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


// <Iframe
//   srcdoc={this.state.editorText}
//   width="450px"
//   height="450px"
//   className="preview"
//   display="initial"
// />



export default EditFragment;
