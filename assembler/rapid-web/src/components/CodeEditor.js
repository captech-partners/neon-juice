import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      outputText: props.outputText,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.outputText !== this.state.outputText) {
      this.setState({
        outputText: newProps.outputText
      })
    }
  }

  handleChange(value) {
    this.props.onHtmlChange(value);
  }

  render() {
    return (
      <div>
        <CodeMirror
          value={this.state.outputText}
          options={{
            mode: "htmlmixed",
            theme: "monokai",
            lineNumbers: true,
            lineWrapping: true,
            autoRefresh: true,
          }}
          onChange={(editor, data, value) => {
            this.handleChange(value);
          }}
        />
      </div>
    );
  }
}
export default CodeEditor;
