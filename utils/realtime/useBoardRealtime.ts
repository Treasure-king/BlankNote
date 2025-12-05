"use client";

import { useEffect } from "react";
import { createClient } from '@supabase/supabase-js'


export function useBoardRealtime(boardId: string, onDelta: (e: any) => void) {
  useEffect(() => {
      const supabase = createClient(
      'https://gbqhivrszppqwjucspji.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicWhpdnJzenBwcXdqdWNzcGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDM1MDIsImV4cCI6MjA3NjUxOTUwMn0.OHpkDDuyQXUV6o76Hz6lk2RLxcCGidjfG4rz0atPyGo'
    )
    console.log("in use board");
    console.log(boardId);
    

    const channel = supabase
      .channel(`board-${boardId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "board_realtime",
          filter: `board_id=eq.'${boardId}'`
        },
        (payload) => {
          console.log("📡 Realtime event received:", payload);
          if (payload.new) onDelta(payload.new);
        }
      )
      .subscribe((status) => console.log("Realtime status:", status));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [boardId, onDelta]);
}
