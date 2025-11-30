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
  const [initialExcalidraw, setInitialExcalidraw] =
    useState<ExcalidrawData | null>(null);

  useEffect(() => {
    fetch(`/api/board/${boardId}`)
      .then((res) => res.json())
      .then((board) => {
        if (board.documentation && editorRef.current) {
          editorRef.current.render(board.documentation);
        }

        if (board.elements) {
          const raw = board.elements;
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
    <div className="w-full h-full flex flex-col lg:flex-row bg-white text-black overflow-hidden">

      {/* Documentation Panel */}
      <div className="w-full lg:w-1/3 xl:w-1/4 h-auto lg:h-full border-r border-gray-200 overflow-hidden bg-[#09090B]">
        <DocumentationPanel boardId={boardId} editorRef={editorRef} />
      </div>

      {/* Excalidraw Area */}
      <div className="flex-1 w-full h-[70vh] lg:h-full">
        {initialExcalidraw && (
          <ExcalidrawBoard
            boardId={boardId}
            initialData={initialExcalidraw}
          />
        )}
      </div>
    </div>
  );
}
