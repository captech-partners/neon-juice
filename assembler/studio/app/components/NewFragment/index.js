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
  width: 50%;
`;


class NewFragment extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            dataLabel: "",
            dataPage: "",
            template: "",
            content: "",

            code: "",
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
    			data: JSON.stringify(code),
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
                <button onClick={e => this.onSubmit(e)}>Create Fragment</button>
            </InputFields>

            <Editor>
              <CodeMirror value={"<div class=\"\" data-child-limit=\"\" data-child-type=\"\" data-id=\"\" data-label=\"" + this.state.dataLabel + "\" data-page=\"" + this.state.dataPage + "\" data-template=\"" + this.state.template + "\">" + this.state.content + "</div>"}
              onChange={this.updateCode} options={options}/>
            </Editor>
          </div>
        );
    }
};

export default NewFragment;
