import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "lucide-react";
import { Editor } from '@tiptap/react';

interface LinkDialogProps {
  editor: Editor;
}

const LinkDialog = ({ editor }: LinkDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const setLink = () => {
    // cancelled
    if (!url) {
      editor.chain().focus().unsetLink().run();
      setIsOpen(false);
      return;
    }

    // update link
    editor.chain().focus().setLink({ href: url }).run();
    setUrl('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Toggle
          size="sm"
          pressed={editor.isActive('link')}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
          title="Add Link"
        >
          <Link className="h-4 w-4" />
        </Toggle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setLink();
                }
              }}
            />
          </div>
          <Button type="submit" onClick={setLink}>
            Add Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;