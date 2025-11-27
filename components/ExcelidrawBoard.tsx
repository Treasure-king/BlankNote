"use client";

import React, { useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import debounce from "lodash.debounce";

export default function ExcalidrawBoard({ boardId, initialData }) {
  const saveExcal = async (elements, appState, files) => {
    await fetch(`/api/board/${boardId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        elements: {
          elements,
          appState,
          files,
        },
      }),
    });
  };

  const debouncedSave = useCallback(debounce(saveExcal, 1200), []);

  // Normalize data again just in case
  const normalizedData = {
    elements: Array.isArray(initialData?.elements) ? initialData.elements : [],
    appState: {
      ...initialData?.appState,
      collaborators: Array.isArray(initialData?.appState?.collaborators)
        ? initialData.appState.collaborators
        : [],
    },
    files: initialData?.files || {},
  };

  return (
    <div className="fixed inset-0 bg-gray-50">
      <Excalidraw
        initialData={normalizedData}
        onChange={(elements, appState, files) =>
          debouncedSave(elements, appState, files)
        }
      />
    </div>
  );
}
