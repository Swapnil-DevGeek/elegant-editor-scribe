import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import HardBreak from '@tiptap/extension-hard-break';
import Typography from '@tiptap/extension-typography';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import MenuBar from './MenuBar';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
}

const lowlight = createLowlight(common);

const RichTextEditor = ({ className, content = '', onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-primary hover:underline cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      HorizontalRule,
      HardBreak,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-sm lg:prose-base xl:prose-lg mx-auto focus:outline-none min-h-[500px] h-full',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className={cn("flex flex-col gap-4 w-full max-w-4xl mx-auto relative", className)}>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <MenuBar editor={editor} />
      </div>
      <div className="min-h-[500px] h-full w-full rounded-lg p-4 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;