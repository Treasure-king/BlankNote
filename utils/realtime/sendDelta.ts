"use client";

import { createClient } from '@supabase/supabase-js'



/**
 * Send a delta update to Supabase Realtime
 * Handles user authentication properly to avoid 403
 */
export async function sendDelta(boardId: string, delta: any) {
  const supabase = createClient(
  'https://gbqhivrszppqwjucspji.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicWhpdnJzenBwcXdqdWNzcGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDM1MDIsImV4cCI6MjA3NjUxOTUwMn0.OHpkDDuyQXUV6o76Hz6lk2RLxcCGidjfG4rz0atPyGo'
)

  // Get current user session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (!session || !session.user) {
    console.warn("User not logged in, skipping delta send");
    return; // stop if user is not logged in
  }

  // console.log(delta.payload);
  

  // Validate delta.payload
  if (!delta.payload) {
    console.error("Payload is null or undefined. Delta not sent.");
    return; // Avoid sending invalid data
  }

  // Insert delta using Supabase client (authenticated)
  const { error } = await supabase
    .from("board_realtime")
    .insert({
      board_id: boardId,
      user_id: session.user.id,
      type: delta.type,
      payload: delta.payload, // keep your nested format
    });

  if (error) {
    console.error("Failed to insert delta:", error.message);
  }
}

