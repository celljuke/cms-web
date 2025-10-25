"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
  disabled = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html === "<p></p>" ? "" : html);
    },
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div
      className={cn(
        "border rounded-md overflow-hidden bg-background",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can().chain().focus().toggleBold().run() || disabled
          }
          className={cn("h-8 w-8 p-0", editor.isActive("bold") && "bg-muted")}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can().chain().focus().toggleItalic().run() || disabled
          }
          className={cn("h-8 w-8 p-0", editor.isActive("italic") && "bg-muted")}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={
            !editor.can().chain().focus().toggleBulletList().run() || disabled
          }
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bulletList") && "bg-muted"
          )}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={
            !editor.can().chain().focus().toggleOrderedList().run() || disabled
          }
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("orderedList") && "bg-muted"
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleLink}
          disabled={disabled}
          className={cn("h-8 w-8 p-0", editor.isActive("link") && "bg-muted")}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run() || disabled}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run() || disabled}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none",
          "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
        )}
      />
    </div>
  );
}
