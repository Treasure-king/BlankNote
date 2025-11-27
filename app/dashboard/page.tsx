"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/board")
      .then((res) => res.json())
      .then((data) => setBoards(data));
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Boards</h1>
        <Button onClick={() => (window.location.href = "/dashboard/new")}>
          <Plus className="w-4 h-4 mr-2" /> New Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <p className="text-muted-foreground">No boards yet. Create your first one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards?.map((board) => (
            <Card
              key={board.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = `/dashboard/${board.id}`)}
            >
              <CardHeader>
                <CardTitle>{board.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {board.collaborators?.length ?? 0} collaborators
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
