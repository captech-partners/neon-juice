import React from 'react';

const HTMLEditor = () => {

  // var editor = CodeMirror.fromTextArea(document.getElementById("editor-textbox"), {
	// 	lineNumbers: true,
	// 	mode: "htmlmixed",
	// 	theme: "nord",
	// });
  //
	// editor.setSize(900, 400);

  return (
    <div className="html-editor">
      <h1>HTML Editor</h1>

      <textarea id="editor-textbox" className="editor-textbox" rows="30" cols="80"></textarea>

    </div>
  );
};

export default HTMLEditor;
