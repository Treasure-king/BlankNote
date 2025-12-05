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
import Header from "@/components/Header";

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
    if (!confirm("Delete this project permanently?")) return;

    const res = await fetch(`/api/board/${boardId}`, { method: "DELETE" });
    if (!res.ok) return alert("Failed to delete project.");

    setBoards((prev) => prev.filter((b) => b.id !== boardId));
  };

  const navigateToBoard = (board: any) => {
    router.push(`/dashboard/${board.id}`);
  };

  // Small helper for priority color badge
  const priorityColor = (p: string) => {
    switch (p?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30";
      case "high":
        return "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-500/30";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-500/30";
      case "low":
        return "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/30";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (

    <>
    <Header />
    
    <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Your Projects
        </h1>

        <Button
          onClick={() => router.push("/dashboard/new")}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors text-white cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      {/* Error */}
      {errorMsg && <p className="text-red-500 mb-6">{errorMsg}</p>}

      {/* Loading */}
      {loading && (
        <p className="text-slate-500 dark:text-slate-400">Loading projects...</p>
      )}

      {/* Empty State */}
      {!loading && boards.length === 0 && !errorMsg && (
        <p className="text-slate-500 dark:text-slate-400">
          No projects yet. Create your first one!
        </p>
      )}

      {/* Grid */}
      {boards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card
              key={board.id}
              className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer bg-white dark:bg-slate-800"
            >
              {/* --- COVER AREA --- */}
              <div
                className="relative h-32 w-full cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 dark:from-black/20 dark:to-black/60"></div>

                {/* Icon badge */}
                {board.icon && (
                  <span className="absolute bottom-2 left-2 text-3xl bg-white dark:bg-slate-700/70 backdrop-blur-md rounded-xl px-2 py-1 shadow">
                    {board.icon}
                  </span>
                )}

                {/* Action menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 text-slate-700 dark:text-slate-200 transition p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-full cursor-pointer"
                    >
                      <MoreHorizontal className="w-5 h-5 drop-shadow" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/${board.id}/edit`);
                      }}
                      className="cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(board.id);
                      }}
                      className="text-red-600 dark:text-red-400 cursor-pointer"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* --- CONTENT AREA --- */}
              <CardHeader
                onClick={() => navigateToBoard(board)}
                className="pb-0 pt-4 cursor-pointer"
              >
                <h2 className="font-semibold text-lg leading-tight line-clamp-1 flex justify-between text-slate-900 dark:text-white">
                  {board.title}
                </h2>

                {board.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {board.description}
                  </p>
                )}
              </CardHeader>

              <CardContent
                onClick={() => navigateToBoard(board)}
                className="pb-4 pt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300"
              >
                {board.category && (
                  <p className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />{" "}
                    <span className="capitalize font-medium">{board.category}</span>
                  </p>
                )}

                {board.priority && (
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-md font-medium ${priorityColor(
                      board.priority
                    )}`}
                  >
                    {board.priority}
                  </span>
                )}

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
    </>
  );
}
