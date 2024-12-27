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
  Table as TableIcon,
  Image,
  Link,
  Minus,
  Undo,
  Redo,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuBarProps {
  editor: Editor | null;
}

// Define the Level type to match TipTap's expected types
type Level = 1 | 2 | 3 | 4 | 5 | 6;

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Define headingLevels as Level type
  const headingLevels: Level[] = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex justify-center gap-2 p-2 rounded-lg bg-white">
      <div className="flex gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted">
          {editor.isActive('heading') ? `H${editor.isActive('heading', { level: 1 }) ? '1' : 
            editor.isActive('heading', { level: 2 }) ? '2' : 
            editor.isActive('heading', { level: 3 }) ? '3' :
            editor.isActive('heading', { level: 4 }) ? '4' :
            editor.isActive('heading', { level: 5 }) ? '5' : '6'}` : 'Paragraph'}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'bg-muted' : ''}
          >
            Paragraph
          </DropdownMenuItem>
          {headingLevels.map((level) => (
            <DropdownMenuItem
              key={level}
              onSelect={() => editor.chain().focus().toggleHeading({ level }).run()}
              className={editor.isActive('heading', { level }) ? 'bg-muted' : ''}
            >
              Heading {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <div className="flex gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <div className="flex gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <div className="flex gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('code')}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <div className="flex gap-1">
        <Toggle
          size="sm"
          onPressedChange={addTable}
          className="hover:bg-muted"
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={addImage}
          className="hover:bg-muted"
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('link')}
          onPressedChange={setLink}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Add Link"
        >
          <Link className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
          className="hover:bg-muted"
          title="Horizontal Line"
        >
          <Minus className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <div className="flex gap-1">
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="hover:bg-muted"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="hover:bg-muted"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
};

export default MenuBar;