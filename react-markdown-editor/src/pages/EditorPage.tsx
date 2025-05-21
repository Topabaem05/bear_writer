import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../assets/global.css';

const EditorPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        className={`editor-textarea ${isFocused ? 'editor-textarea-focused' : ''}`}
        placeholder="Start typing your Markdown here..."
        value={text}
        onChange={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="markdown-preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default EditorPage;
