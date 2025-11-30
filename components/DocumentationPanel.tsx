"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";

import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import debounce from "lodash.debounce";

export default function DocumentationPanel({ boardId, editorRef }) {
  const [open, setOpen] = useState(true);

  // ------------------------
  // AUTO-SAVE FUNCTION
  // ------------------------
  const saveDocs = async () => {
    if (!editorRef.current) return;
    const output = await editorRef.current.save();

    await fetch(`/api/board/${boardId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentation: output }),
    });
  };

  const debouncedSave = useRef(debounce(saveDocs, 1200)).current;

  // ------------------------
  // INIT EDITOR.JS
  // ------------------------
  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor-docs",
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          quote: Quote,
          code: Code,
          table: Table,
          inlineCode: InlineCode,
        },
        onChange: debouncedSave,
      });

      editorRef.current = editor;
    }
  }, [debouncedSave]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed md:absolute 
          top-4 left-0
          z-50 
          bg-white text-black 
          shadow-lg 
          p-2 rounded-lg 
          hover:bg-gray-100 
          transition
        "
      >
        <FiMenu size={22} />
      </button>

      {/* Slide / Sidebar Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="
          fixed lg:absolute 
          top-0 left-0 
          h-full 
          w-[90%] sm:w-[70%] md:w-[50%] lg:w-1/3 xl:w-1/3 
          bg-white 
          shadow-2xl 
          z-40 
          overflow-y-auto 
          p-4 
          border-r border-gray-200
        "
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Documentation
        </h2>

        <div id="editor-docs" className="min-h-[80vh]"></div>
      </motion.div>
    </>
  );
}
