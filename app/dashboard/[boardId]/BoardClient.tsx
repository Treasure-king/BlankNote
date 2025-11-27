"use client";

import { useEffect, useRef, useState } from "react";
import DocumentationPanel from "@/components/DocumentationPanel";
import ExcalidrawBoard from "@/components/ExcelidrawBoard";

interface ExcalidrawData {
  elements: any[];
  appState: any;
  files: any;
}

export default function BoardClient({ boardId }) {
  const editorRef = useRef(null);
  const [initialExcalidraw, setInitialExcalidraw] = useState<ExcalidrawData | null>(null);

useEffect(() => {
  fetch(`/api/board/${boardId}`)
    .then(res => res.json())
    .then(board => {
      // Load documentation
      if (board.documentation && editorRef.current) {
        editorRef.current.render(board.documentation);
      }

      // Load Excalidraw
      if (board.elements) {
        const raw = board.elements; // this is the object stored in DB
        setInitialExcalidraw({
          elements: raw.elements || [],
          appState: raw.appState || { collaborators: [] },
          files: raw.files || {},
        });
      } else {
        setInitialExcalidraw({
          elements: [],
          appState: { collaborators: [] },
          files: {},
        });
      }
    });
}, [boardId]);


  return (
    <div className="w-full h-full text-black">
      <DocumentationPanel boardId={boardId} editorRef={editorRef} />

      {/* Only mount Excalidraw when initial data is ready */}
      {initialExcalidraw && (
        <ExcalidrawBoard
          boardId={boardId}
          initialData={initialExcalidraw} // pass the full object, not just .elements
        />
      )}
    </div>
  );
}
