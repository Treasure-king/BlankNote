"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewBoardPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch("/api/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create a New Board</h1>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter board title"
          className="mb-4"
        />
        <Button
          disabled={!title}
          onClick={handleCreate}
          className="w-full"
        >
          Create Board
        </Button>
      </div>
    </div>
  );
}
