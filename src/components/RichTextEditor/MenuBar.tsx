import React from 'react';
import { Editor } from '@tiptap/react';
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: <Bold className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: 'Bold',
    },
    {
      icon: <Italic className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: 'Italic',
    },
    {
      icon: <Underline className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      tooltip: 'Underline',
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      tooltip: 'Strikethrough',
    },
    {
      icon: <Code className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      tooltip: 'Code',
    },
    {
      icon: <Heading1 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1',
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3',
    },
    {
      icon: <List className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      tooltip: 'Numbered List',
    },
    {
      icon: <Quote className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      tooltip: 'Quote',
    },
    {
      icon: <AlignLeft className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
      tooltip: 'Align Left',
    },
    {
      icon: <AlignCenter className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
      tooltip: 'Align Center',
    },
    {
      icon: <AlignRight className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
      tooltip: 'Align Right',
    },
  ];

  return (
    <div className="border border-input bg-transparent rounded-lg p-1 flex flex-wrap gap-1">
      {buttons.map((button, index) => (
        <Toggle
          key={index}
          size="sm"
          pressed={button.isActive}
          onPressedChange={button.onClick}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title={button.tooltip}
        >
          {button.icon}
        </Toggle>
      ))}
      <input
        type="color"
        onInput={event => {
          editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()
        }}
        className="w-8 h-8 p-0 border-none cursor-pointer"
        title="Text Color"
      />
    </div>
  );
};

export default MenuBar;