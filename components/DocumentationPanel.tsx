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
      // data: initialDocumentation,
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        quote: Quote,
        code: Code,
        table: Table,
        inlineCode: InlineCode,
      },
      onChange: debouncedSave,   // <-- ATTACH HERE
    });

    editorRef.current = editor;
  }
}, [debouncedSave]);





  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 left-4 z-50 bg-white shadow-lg p-2 rounded-lg hover:bg-gray-100 transition text-black"
      >
        <FiMenu size={22} />
      </button>

      {/* Slide Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute top-0 left-0 h-full w-1/4 bg-white shadow-2xl z-40 overflow-y-auto p-4"
      >
        <h2 className="text-xl text-center font-semibold mb-4 text-black">
          Documentation
        </h2>
        <div id="editor-docs" className="min-h-[80vh]"></div>
      </motion.div>
    </>
  );
}
