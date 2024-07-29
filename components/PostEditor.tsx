import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

interface Props {
  content?: string;
  onChange: (html: string) => void;
  editable?: boolean;
}

export default function PostEditor(props: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.content || '',
    onCreate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
    onUpdate: ({ editor, transaction }) => {
      props.onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleClick = () => {
    if (editor) {
      editor.commands.focus();
    }
  };

  useEffect(() => {
    if (editor) {
      editor.setEditable(props.editable ?? true);
      const endPos = editor.state.doc.content.size;
      editor.commands.focus();
      editor.commands.setTextSelection(endPos);
    }
  }, [props.editable, editor]);

  return (
    <EditorContent
      onClick={handleClick}
      className="post-editor-container post-content-view"
      editor={editor}
    />
  );
}
