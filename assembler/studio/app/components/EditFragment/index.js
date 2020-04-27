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
import 'react-quill/dist/quill.bubble.css';




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
`


class EditFragment extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          class: "",

          dataChildLimit: "",
          dataChildType: "",
          dataID: 8,
          dataLabel: "",
          dataPage: "",

          template: "",
          content: "",

          code: ""
      };

      this.updateCode = this.updateCode.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
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

            let parsedContent = response.data.html.substring(response.data.html.indexOf(">") + 1, response.data.html.lastIndexOf("</div>"));

            current.setState({
              class: response.data.class_attr,
              code: response.data.html,
              dataPage: response.data.pages,
              dataLabel: response.data.labels,
              template: response.data.templates,
              content: parsedContent
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
      this.setState({dataID: givenDataID});

      const url = "http://localhost:5000/fragments/" + this.state.dataID;

      axios.get(url)
        .then(function (response) {

          current.setState({
            class: response.data.class_attr,
            code: response.data.html,
            dataPage: response.data.pages,
            dataLabel: response.data.labels,
            template: response.data.templates,
          })

        })
        .catch(function (error) {
          console.log(error);
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
          code: "<div class=\"" +
          this.state.class + "\" data-id=\"" +
          this.state.dataID + "\" data-label=\"" +
          this.state.dataLabel + "\" data-page=\"" +
          this.state.dataPage + "\" data-template=\"" +
          this.state.template + "\">\n\t" +
          this.state.content + "\n</div>\n\t"
      });
  };


  onAddSlot = e => {

    let fragmentCode = ""

    this.setState((state, props) => ({
      code: state.code.substring(0, state.code.indexOf("</div>")) + e.target.value + "</div>"
    }));

  };

  handleSubmit(event) {
    this.setState({
      dataChildLimit: this.inputDataChildLimit.current.value,
      dataChildType: this.inputDataChildType
    });

    event.preventDefault();
  }


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
            </form>

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
                      ref={this.iinputDataChildType}
                  />
              </p>

              <input type="submit" value="Add Fragment Slot" />

              <Button onClick={e => this.onAddSlot(e)}></Button>
            </form>


          </InputFields>



          <Editor>
            <CodeMirror value={"<div class=\"" +
            this.state.class + "\" data-id=\"" +
            this.state.dataID + "\" data-child-limit=\"" +
            this.state.dataChildLimit + "\" data-child-type=\"" +
            this.state.dataChildType + "\" data-label=\"" +
            this.state.dataLabel + "\" data-page=\"" +
            this.state.dataPage + "\" data-template=\"" +
            this.state.template + "\">\n\t" +
            this.state.content + "\n</div>\n\t"}

            onChange={this.updateCode} options={options}/>
          </Editor>
        </div>
      );
  }
};


// <ReactQuill theme="snow" value={this.state.content} onChange={e => this.change(e)} ref="content"/>

export default EditFragment;
