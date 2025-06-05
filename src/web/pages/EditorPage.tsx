import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'; // Import Highlight
import '../assets/global.css';

const EditorPage: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure heading levels if you want to match mockup more closely
        // e.g., heading: { levels: [1, 2, 3] }
        // Tiptap's default heading levels are 1-6.
        // The mockup implies h2 is the main document title style.
        // If we want h1 in content to be larger, we can keep default or specify levels.
      }),
      Highlight.configure({ multicolor: false }), // Add Highlight extension
    ],
    content: `
      <h2>1. Down the Rabbit Hole</h2>
      <p>Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.</p>
      <p><em>"And what is the use of a book,"</em> thought Alice, <em>"without pictures or conversations?"</em></p>
      <p>So she was considering in her own mind, as well as she could, for the <strong>hot day</strong> made her feel very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.</p>
      <p>There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, <em>"Oh dear! Oh dear! I shall be late!"</em> But when the Rabbit actually took a <mark>small key to a door</mark> out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet.</p>
      <p><s>She tried to look down and see what was coming</s> but it was too dark to see anything.</p>
      <h3>A Smaller Heading</h3>
      <p>More text here to see spacing.</p>
      <h1>An H1 Heading (Larger)</h1>
      <p>Text after H1 to see its bottom margin and border.</p>
    `,
  });

  const handleGoBack = () => console.log('Navigate back (placeholder)');
  const handleGoForward = () => console.log('Navigate forward (placeholder)');

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="nav-controls">
          <button className="nav-btn" onClick={handleGoBack} aria-label="Go back">
            ←
          </button>
          <button className="nav-btn" onClick={handleGoForward} aria-label="Go forward">
            →
          </button>
        </div>
        <div className="filename-display">
          1. Down the Rabbit Hole.txt
        </div>
      </div>
      <div className="tiptap-editor-wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorPage;
