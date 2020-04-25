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

class EditTemplate extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            templateName: "",
            content: "",

            dataChild: "",
            dataPage: "",
            dataLabel: "",
            dataID: -1,

            dataChildClass: "",
            dataChildLimit: "",
            dataChildType: "",

            code: ""
        };

        this.updateCode = this.updateCode.bind(this);
    }

    componentDidMount() {

      var current = this;

      const { givenDataID } = this.props.location.state;
      this.setState({dataID: givenDataID});

      const url = "http://localhost:5000/fragments/" + this.state.dataID;

      axios.get(url)
        .then(function (response) {

          current.setState({
            templateName: (response.data.class_attr != "null") ? response.data.class_attr : "",
            code: response.data.html,
            dataPage: response.data.pages,
            dataLabel: response.data.labels,
            // dataID: response.data.id
          })
        })
        .catch(function (error) {
          console.log(error);
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
              templateName: (response.data.class_attr != "null") ? response.data.class_attr : "",
              code: response.data.html,
              dataPage: response.data.pages,
              dataLabel: response.data.labels,
              // dataID: response.data.id
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
        const url = "http://localhost:5000/fragments/" + this.state.dataID;

        axios({
          method: 'put',
          url: url,
          dataType: "json",
          contentType:"application/json",
          data: JSON.stringify({html: code}),
          success: function(result){
    				console.log('success');
    			},
    			error: function(result){
    				console.log(result);
    			},
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
            <h1>Edit Template: {this.state.templateName}</h1>

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
                <Button onClick={e => this.onSubmit(e)}>Save Template</Button>
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
              onChange={this.updateCode} options={options}/>
            </Editor>
          </div>
        );
    }
};

export default EditTemplate;


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
