import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import KaTeXKeyboard from './KaTeXKeyboard'
import 'katex/dist/katex.min.css';
import 'katex/contrib/auto-render/auto-render';

const LaTeXEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const insertLaTeX = (latex) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range) {
      quill.insertText(range.index, `\\(${latex}\\)`, 'user');
    }
    renderLaTeX();
  };
  

  const renderLaTeX = () => {
    setTimeout(() => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        const editorElement = editor.root;
        katex.renderMathInElement(editorElement, {
          delimiters: [
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
        });
      }
    }, 0);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={LaTeXEditor.modules}
        formats={LaTeXEditor.formats}
        theme="snow"
      />
       <KaTeXKeyboard onInsert={insertLaTeX} />
    </div>
  );
};

LaTeXEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean'],
  ],
};

LaTeXEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default LaTeXEditor;
