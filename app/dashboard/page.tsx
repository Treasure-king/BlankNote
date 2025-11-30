"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Plus,
  CalendarDays,
  Users,
  Tag,
  MoreHorizontal,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // -------------------------------------------------
  // Fetch Boards
  // -------------------------------------------------
  useEffect(() => {
    fetch("/api/board")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load boards");
        return data;
      })
      .then((data) => setBoards(data))
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, []);

  // -------------------------------------------------
  // Delete
  // -------------------------------------------------
  const handleDelete = async (boardId: string) => {
    if (!confirm("Delete this board permanently?")) return;

    const res = await fetch(`/api/board/${boardId}`, { method: "DELETE" });
    if (!res.ok) return alert("Failed to delete board.");

    setBoards((prev) => prev.filter((b) => b.id !== boardId));
  };

  const navigateToBoard = (board: any) =>
  {
    console.log(board.id);
    router.push(`/dashboard/${board.id}`);
  }

  // Small helper for priority color badge
  const priorityColor = (p: string) => {
    switch (p?.toLowerCase()) {
      case "critical":
        return "bg-red-500/15 text-red-600 border border-red-500/20";
      case "high":
        return "bg-orange-500/15 text-orange-600 border border-orange-500/20";
      case "medium":
        return "bg-yellow-500/15 text-yellow-600 border border-yellow-500/20";
      case "low":
        return "bg-green-500/15 text-green-600 border border-green-500/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>

        <Button onClick={() => router.push("/dashboard/new")}>
          <Plus className="w-4 h-4 mr-2 cursor-pointer"/> New Project
        </Button>
      </div>

      {/* Error */}
      {errorMsg && <p className="text-red-500 mb-6">{errorMsg}</p>}

      {/* Loading */}
      {loading && <p className="text-muted-foreground">Loading projects...</p>}

      {/* Empty State */}
      {!loading && boards.length === 0 && !errorMsg && (
        <p className="text-muted-foreground">
          No projects yet. Create your first one!
        </p>
      )}

      {/* Grid */}
      {boards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card
              key={board.id}
              className="group rounded-2xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              {/* --- COVER AREA --- */}
              <div
                className="relative h-32 w-full"
                onClick={() => navigateToBoard(board)}
              >
                {board.coverImage ? (
                  <img
                    src={board.coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ backgroundColor: board.color || "#e5e7eb" }}
                  />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-80"></div>

                {/* Icon badge */}
                {board.icon && (
                  <span className="absolute bottom-2 left-2 text-3xl bg-white/70 backdrop-blur-md rounded-xl px-2 py-1 shadow">
                    {board.icon}
                  </span>
                )}

                {/* Action menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 text-white transition p-2 hover:bg-white hover:text-black rounded-full cursor-pointer"
                    >
                      <MoreHorizontal className="w-5 h-5 drop-shadow" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-36 cursor-pointer" >
                    <DropdownMenuItem
                      onClick={(e) =>
                      {
                        e.stopPropagation(); 
                        router.push(`/dashboard/${board.id}/edit`)
                      }
                      }
                      className="hover:bg-yellow-500! cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="hover:bg-red-500! cursor-pointer"
                      onClick={(e) => 
                        {
                          e.stopPropagation(); 
                          handleDelete(board.id)
                        }
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* --- CONTENT AREA --- */}
              <CardHeader
                onClick={() => navigateToBoard(board)}
                className="pb-0 pt-4"
              >
                <h2 className="font-semibold text-lg leading-tight line-clamp-1 flex justify-between">
                  {board.title}
                </h2>

                {/* Description */}
                {board.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {board.description}
                  </p>
                )}
              </CardHeader>

              <CardContent
                onClick={() => navigateToBoard(board)}
                className="pb-4 pt-3 space-y-2 text-sm text-muted-foreground"
              >
                {/* Category */}
                {board.category && (
                  <p className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span className="capitalize font-medium">
                      {board.category}
                    </span>
                  </p>
                )}

                {/* Priority */}
                {board.priority && (
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-md font-medium ${priorityColor(
                      board.priority
                    )}`}
                  >
                    {board.priority}
                  </span>
                )}

                {/* Due Date */}
                {board.dueDate && (
                  <p className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    Due:{" "}
                    {new Date(board.dueDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}

                {/* Collaborators */}
                <p className="flex items-center gap-1 text-xs mt-2">
                  <Users className="w-4 h-4" />
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
